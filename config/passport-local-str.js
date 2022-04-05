const { Passport } = require('passport');
const passport = require('passport');

const localStr = require('passport-local').Strategy;

const User = require('../models/user');



//authentication using passport

passport.use(new localStr({
    usernameField: 'email',
}, function(email, password, done){
    //find a user ans establish the identit

    User.findOne({email: email}, function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }

        if(!user || user.password != password){
            console.log("invalid username/password");
            return done(null, false);
        }

        return done(null, user);

    });

}
));


// serilizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthenticate = function(req, res, next){
    //if the user is signin, then pass on the req to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();

    }
    //if the user is not signined
    return res.redirect('/user/signin');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signined user form session cookie and we are sending this to the locals for the views 
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;