const User = require('../models/user');
const fs = require('fs');
const path = require('path');



module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (arr, user) {
        return res.render("user_profile", {
            title: "user profile",
            profile_user: user
        })
    })
}

module.exports.update = async function (req, res) {
    // if (req.params.id == req.user.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.params.id == req.user.id) {
        try {

            let user = await User.findById(req.params.id);

            // console.log(user);

            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('***************** Multer Error ', err);
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {

                        let imgPath = path.join(__dirname, '..', user.avatar);
                        try {
                            if (fs.existsSync(imgPath)) {
                                fs.unlinkSync(imgPath);
                            }
                        } catch (err) {
                            console.error(err); 
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                req.flash('success', 'Updated Successfully')
                return res.redirect('back')

            })

        } catch (err) {
            req.flash('error', err);
            console.log(err);
            return res.redirect('back');
        }

    } else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signup = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/user/profile/:id');
    }


    return res.render('user_signup', {
        title: "CodersConnect | signup"
    })
}


module.exports.signin = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/user/profile/:id');
    }

    return res.render('user_signin', {
        title: "CodersConnect | signin"
    })
}

module.exports.create = function (req, res) {
    if (req.body.email != req.body.confirm_email) {
        return res.redirect('back');
    }

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, usr) {
        if (err) {
            console.log('cannot find user');
            return;
        }

        if (!usr) {
            User.create(req.body, function (err, usr) {
                if (err) {
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

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.releasSeassion = function (req, res) {
    req.logout();
    req.flash('success', 'Logged out Successfully');

    return res.redirect('/');
}