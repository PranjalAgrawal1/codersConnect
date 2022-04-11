const { redirect } = require('express/lib/response');
const comment = require('../models/comments');
const { findByIdAndDelete } = require('../models/post');
const post = require('../models/post');

module.exports.create = function(req, res){

    post.findById(req.body.post, function(err, post){
        if(post){
            comment.create({
                content : req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('error in creating a post');
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            })
        }
    })
}

module.exports.destroy = function(req, res){
    comment.findById(req.params.id, function(err, Comment){

        if( Comment.user == req.user.id){
            console.log(Comment.post);
            console.log(req.params.id);
            
            post.findByIdAndUpdate(Comment.post , {
                $pull: {
                    comments : req.params.id
                }
            }, function(err, post){
                Comment.remove();
            return res.redirect('back')
            })
        } else {
            return res.redirect('back');
        }
    })
}