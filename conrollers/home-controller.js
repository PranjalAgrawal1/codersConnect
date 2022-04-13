const post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    if (!req.isAuthenticated()) {
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

    try {
        let posts = await post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            })

        let users = await User.find({});
        return res.render('home', {
            title: "CodersConnect",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('ERROR', err);
        return;
    }
}