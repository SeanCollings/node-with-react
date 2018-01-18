import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from './config/keys';

const app = express();

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      // Take user identifying information and save to DB
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);

// Make request to Google
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Get callback from Google
app.get('/auth/google/callback',
  passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Server listening on port', PORT);