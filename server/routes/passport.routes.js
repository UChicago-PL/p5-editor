import Router from 'express';
import passport from 'passport';

const router = new Router();

router.get('/auth/gitlab', passport.authenticate('gitlab'));
router.get('/auth/gitlab/callback', (req, res, next) => {
  passport.authenticate('gitlab', { failureRedirect: '/login' }, (err, user) => {
    if (err) {
      // use query string param to show error;
      res.redirect('/login?error=gitlab');
      return;
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        next(loginErr);
        return;
      }
      res.redirect('/');
    });
  })(req, res, next);
});

export default router;
