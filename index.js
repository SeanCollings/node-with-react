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

mongoose.connect(keys.mongoURI);

const app = express();

/* Middlewares start */
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
/* Middlewares end */

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Server listening on port', PORT);












/*
            _______________
            | request     |
            |from browser |
            |_____________|
                  |
                  \/
__________     _________
|express()| -> |  app   |
|_________|    |________|  (our application object -> create by express)
                  |
                  \/
            _____________
            |Middleware 1|
            |____________|
                  |
                  \/
            _____________
            |Middleware 2|
            |____________|
      ____________|____________
     |            |            |
  ___\/___      __\/___      __\/___
  | get  |     | post |     |delete|
  |______|     |______|     |______|
      |___________|____________|
                  |
            ______\/______
            |  response  |
            |____________|

*/