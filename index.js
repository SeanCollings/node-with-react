import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';

import keys from './config/keys';
import authRoutes from './routes/authRoutes';

// Put User first before passport so that user is
// created before passport needs to use it
import './models/User';
import './services/passport';

/*mongoose.connect(keys.mongoURI)
  .then((req, res) => {console.log('Success!');})
  .catch(error => {console.log('error:', error);});*/

mongoose.connect(keys.mongoLocal);

const app = express();

// Tell express to make use of cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// Tell passport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Server listening on port', PORT);