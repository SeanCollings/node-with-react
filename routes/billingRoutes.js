import keys from '../config/keys';
import requireLogin from '../middlewares/requireLogin';

// use this as 'import' doesn't seem to work
const stripe = require('stripe')(keys.stripeSecretKey);

export default app => {
  // requireLogin -> Middleware, Make sure user is logged in before billing
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};