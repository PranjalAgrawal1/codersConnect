const passport = require('passport');
const googleStr = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const crediantials = require('../passwords/googleauth')

passport.use(new googleStr({
    clientID: crediantials.clientID,
    clientSecret: crediantials.clientSecret,
    callbackURL: "http://localhost:8000/user/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({
        email: profile.emails[0].value
    }).exec(function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        // console.log("accessToken: ", accessToken);
        // console.log("refreshToken: ", refreshToken);
        // console.log(profile);

        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function (err, user) {
                if (err) {
                    console.log(err);
                    return
                }
                return done(null, user);
            })
        }
    })
}
))

module.exports = passport;