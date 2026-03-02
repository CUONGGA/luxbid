const passport = require('passport');

class AuthController {
  loginPage(req, res) {
    res.render('auth/login', {hideNavbar: true});
  }

  login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.redirect('/auth/login');
      }

      req.logIn(user, (err) => {
        if (err) return next(err);

        req.session.successLogin = true;
        console.log("SET SESSION:", req.session);
        req.session.save(() => {
          return res.redirect('/');
        });
      });
    })(req, res, next);
  }

  logout(req, res, next) {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
}

module.exports = new AuthController();