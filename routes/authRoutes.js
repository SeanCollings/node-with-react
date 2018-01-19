import passport from 'passport';

export default app => {
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

  app.get('/api/logout', (req, res) => {
    // Passport attaches functions to the 'req' object
    // Logout takes the cookie that contains the user id,
    // and deletes id inside it
    // IE removes req.user (user attached to passport)
    req.logout();

    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    // passport automatically attached the 'user' property to the 'req' object
    res.send(req.user);
  });
}
