import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

import keys from '../config/keys';

// Get users model out of mongoose
const User = mongoose.model('users');

// encode user id inside of the cookie..
passport.serializeUser((user, done) => {
  // 'user.id' -> id in DB
  // Can't always assume they'll have a google id
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Get User from DB by ID
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true // just trust the proxy
  },
    // Callback from oauth if succesful
    (accessToken, refreshToken, profile, done) => {
      // Check to see if user in DB first
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // we already have a record with the given profile ID
            // done(error, userRecord)
            done(null, existingUser);
          }
          else {
            // We dont have a user record with this ID, make a new record
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
    }
  )
);
