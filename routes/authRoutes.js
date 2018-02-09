import passport from 'passport';

export default app => {
  // Make request to Google
  // Passport knows to look for 'google' service
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })
  );

  // Get callback from Google
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys'); //direct to '/surveys' after authenticating
    }
  );

  app.get('/api/logout', (req, res) => {
    // Passport attaches functions to the 'req' object
    // Logout takes the cookie that contains the user id,
    // and deletes id inside it
    // IE removes req.user (user attached to passport)
    req.logout();
    res.redirect('/'); // on logout redirect user to homepage
  });

  app.get('/api/current_user', (req, res) => {
    // passport automatically attached the 'user' property to the 'req' object
    /*
        req.session: contains the data that passport is attempting
                     to store inside of the cookie

        ..Then passport looks at req.session (contains ID of user in DB)
    */
    res.send(req.user);
  });
}
