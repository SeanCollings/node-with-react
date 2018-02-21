import mongoose from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import Mailer from '../services/Mailer';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import { creditsDeduct } from '../utils/credits';
// Get surveys model out of mongoose
const Survey = mongoose.model('surveys');

export default app => {
  /*app.get('/api/surveys', async (req, res) => {
    res.send(200);
  });*/
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
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
};