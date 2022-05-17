const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.toggleLike = async function (req, res) {
    try {
        // like/toggle/?id=abcd&type=post
        let likeable;
        let deleted = false;

        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }


        let existingLike = await Like.findOne({
            likable: req.query.id,
            onModel: req.query.type,
            user: req.user.id
        });

        
        //if a like already exists then Delete it
        if (existingLike) {

            likeable.likes.pull(existingLike._id);            
            likeable.save();
            existingLike.remove()
            deleted = true;
        } 
        else {
            let newLike = await Like.create({
                user: req.user.id,
                likable: req.query.id,
                onModel: req.query.type,

            });
            likeable.likes.push(newLike.id);
            likeable.save();            
        }

        return res.json(200, {
            message: 'request successfull',
            data: {
                deleted: deleted,
            }
        })

    } catch (err) {
        console.log(err);
        return res.json(500, {
            message: 'internal surver error'
        })
    }
}