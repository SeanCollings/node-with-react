import _ from 'lodash';
import Path from 'path-parser';
import { URL } from 'url';
import mongoose from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import Mailer from '../services/Mailer';

import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import { creditsDeduct } from '../utils/credits';
// Get surveys model out of mongoose
const Survey = mongoose.model('surveys');

export default app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys.reverse());
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    const choice = req.url.substr(req.url.lastIndexOf('/') + 1);

    if (choice === 'yes') {
      res.send(`Thanks for voting! Your choice: ${choice}`);
    }
    else {
      res.send(`Wow. \"Thanks\" for voting ${choice}... How sweet of you to say.
      I see how it is. **unamused face ensues**`);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // Get values required from url

    // lodash chain helper - add on any lodash function after each other
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);        // pathname gets '/api/surveys/:/:'

        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()                    //remove undefined elements
      .uniqBy('email', 'surveyId')  //only keep values that are unique
      .each(({ surveyId, email, choice }) => {              //update DB
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 }, //$inc - mongo operator. Find 'yes' OR 'no', increment by 1
            $set: { 'recipients.$.responded': true },  //'&' matches $elemMatch of orig query
            lastResponded: new Date()
          }
        ).exec();                 //execute
      })
      .value();                   //return array

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, field, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      field,
      recipients: recipients.map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // mailer joins survey fields and template together
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= creditsDeduct;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete('/api/surveys/delete', requireLogin, async (req, res) => {
    await Survey.findByIdAndRemove({
      _id: req.query.surveyId, callback: (err, res) => {
        if (err)
          throw err;
      }
    });

    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys.reverse());
  });
};