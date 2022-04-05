const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title : "user profile"
    })
}

module.exports.signup = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }


    return res.render('user_signup', {
        title: "CodersConnect | signup"
    })
}


module.exports.signin = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_signin', {
        title: "CodersConnect | signin"
    })
}

module.exports.create = function(req, res){
    if(req.body.email != req.body.confirm_email ){
        return res.redirect('back');
    }

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err, usr){
        if(err){
            console.log('cannot find user');
            return;
        }

        if(!usr){
            User.create(req.body, function(err, usr){
                if(err){
                    console.log('cannot create user');
                    return;
                }

                return res.redirect('/user/signin');

            })
        } else {
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.releasSeassion = function(req, res){
    req.logout();
    return res.redirect('/');
}