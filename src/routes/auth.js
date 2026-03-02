const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../app/controllers/AuthController');
const registerController = require('../app/controllers/RegisterController');

router.get('/login', authController.loginPage);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/auth/login');

    req.logIn(user, (err) => {
      if (err) return next(err);

      req.session.successLogin = true;

      req.session.save(() => {
        return res.redirect('/');
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/facebook',
  passport.authenticate('facebook')
);

router.get('/facebook/callback',
  (req, res, next) => {
    passport.authenticate('facebook', (err, user) => {
      if (err) return next(err);
      if (!user) return res.redirect('/auth/login');

      req.logIn(user, (err) => {
        if (err) return next(err);

        req.session.successLogin = true;

        req.session.save(() => {
          return res.redirect('/');
        });
      });
    })(req, res, next);
  }
);

router.get('/register', (req, res) => {
  res.render('auth/register', {
    hideNavbar: true
  });
});

router.post('/register', registerController.register);

module.exports = router;