const Comment = require('../models/comments');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like')

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            
            post.comments.push(comment);
            post.save();

            comment = await comment.populate({ path: "user", select: 'name email' });

            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
                console.log('job enqueued', job.id);
            })
            if (req.xhr) {

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            req.flash('success', 'Comment published!');
            res.redirect('back');
        }
    } catch (err) {
        console.log('ERROR', err);
        return;
    }
}



module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {

            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            console.log("pranjal : " + comment);

            await Like.deleteMany({
                likable: comment._id,
                onModel: 'Comment'
            });

            // send the comment id which was deleted back to the views
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}




// module.exports.create = function(req, res){

//     post.findById(req.body.post, function(err, post){
//         if(post){
//             comment.create({
//                 content : req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 if(err){
//                     req.flash('error', 'Cannot Add Comment');

//                     return;
//                 }
//                 post.comments.push(comment);
//                 post.save();
//                 req.flash('success', 'Comment Added Successfully');

//                 res.redirect('back');
//             })
//         }
//     })
// }



// module.exports.destroy = function(req, res){
//     comment.findById(req.params.id, function(err, Comment){

//         if( Comment.user == req.user.id){
//             console.log(Comment.post);
//             console.log(req.params.id);

//             post.findByIdAndUpdate(Comment.post , {
//                 $pull: {
//                     comments : req.params.id
//                 }
//             }, function(err, post){

//                 Comment.remove();
//                 req.flash('success', 'Comment Deleted SuccessFully');

//             return res.redirect('back')
//             })
//         } else {
//             req.flash('error', 'Cannot Delete Comment');
//             return res.redirect('back');
//         }
//     })
// }

