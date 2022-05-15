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

        // if (req.query.type == 'Post') {
        //     likeable = Post
        // } else {
        //     likeable = Comment
        // }

        // console.log(req.user.id)
        // console.log(req);

        // check if a like already exists

        let existingLike = await Like.findOne({
            likable: req.query.id,
            onModel: req.query.type,
            user: req.user.id
        });

        

        console.log(' existingLike like : ', existingLike)

        //if a like already exists then Delete it

        if (existingLike) {

            likeable.likes.pull(existingLike);            
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

            // await likeable.findById(req.query.id).populate('likes')

            likeable.likes.push(newLike.id);
            likeable.save();


            // console.log('newLike : ', newLike);
            
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