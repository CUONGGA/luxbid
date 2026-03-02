const passport = require('passport');
const User = require('../app/models/User');

passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

passport.deserializeUser(async function(id, done) {
        try {
            const user = await User.findById(id).lean();
            done(null, user);
        } catch(err) {
            done(err, null);
        }
});