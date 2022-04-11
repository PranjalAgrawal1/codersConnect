const post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){

    if(!req.isAuthenticated()){
        return res.redirect('/user/signin');
    }
    // console.log(req.cookies);

    // post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "CodersConnect",
    //         posts : posts,
    //     });
    // });

    // populate the user of each post
    post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path : 'user',
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            return res.render('home', {
                title: "CodersConnect",
                posts: posts,
                all_users : users
            });
        });
    })
}