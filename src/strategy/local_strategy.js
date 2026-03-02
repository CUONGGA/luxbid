const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/User');

passport.use(new LocalStrategy(
  {
    usernameField: 'identifier',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({
        $or: [
          { username: username },
          { email: username }
        ]
      });

      if (!user) {
        return done(null, false);
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
