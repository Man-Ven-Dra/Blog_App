const Post = require("../models/postModel")
const Likes = require("../models/likeModel")

exports.likePost = async (req, res) => {
    try{
        const {post, user} = req.body;
        const like = new Likes({
            post, user
        })
        const savedLike = await like.save();
        const updatePost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
        .populate("likes")
        .exec();
        res.status(200).json(
        {
            success: true,
            data: updatePost,
            message: 'Like Added Successfully'
        }
    )
    }
    catch(err){
        console.error(err)
        res.status(500).json(
            {
                success: false,
                data: "Error while Liking",
                message: err.message,
            }
        )
    }
}

exports.unlikePost = async (req, res) => {
    try{
        const {post, like} = req.body;
        
        const deletedLike = await Likes.findOneAndDelete({post:post, _id:like});
        const updatePost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true});
        res.status(200).json(
        {
            success: true,
            data: updatePost,
            message: 'Like Deleted Successfully'
        }
    )
    }
    catch(err){
        console.error(err)
        res.status(500).json(
            {
                success: false,
                data: "Error while Deleting Like",
                message: err.message,
            }
        )
    }
}