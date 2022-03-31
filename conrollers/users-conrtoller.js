const User = require('../models/user');


module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title : "User Profile",
                    user: user,
                });

            }
            return res.redirect('/user/signin');
        });

    } else {

        return res.redirect('/user/signin');
    }






    // return res.render('user_profile', {
    //     title : "user profile"
    // })
}

module.exports.signup = function(req, res){
    return res.render('user_signup', {
        title: "CodersConnect | signup"
    })
}


module.exports.signin = function(req, res){
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
    // find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log("error in finding user in signin"); return}

        // handle user found

        if(user){

            // handle passwords which dont match
            if(user.password != req.body.password){
                // alert("wrong password");
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user._id);
            return res.redirect('/user/profile');

        }else{
            //handle user not found
            return res.redirect('back');
        }

    })

}


module.exports.signout = function(req, res){

    res.clearCookie('user_id');
    
    return res.redirect('/user/signin');


}