
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../app/models/User');
const passport = require('passport');
    passport.use(new FacebookStrategy({
    clientID: "2658870377779594",
    clientSecret: "811ed23a7a4504baec0f8e41a6e8cba3",
    callbackURL: "https://bipinnate-fernier-chase.ngrok-free.dev/auth/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log('FACEBOOK PROFILE:', profile)
      let user = await User.findOne({ facebookId: profile.id });
      if (!user){
        user = await User.create({
          facebookId: profile.id,
          name: profile.displayName,
          provider: profile.provider
        });
        console.log('New user create!');
      }else{
        console.log('User already exists');
      }
        return done(null, user);
    } catch {
      return done(err);
    }
  }
));
