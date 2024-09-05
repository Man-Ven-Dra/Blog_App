const Post = require("../models/postModel")
const Comments = require("../models/commentModel")

exports.createComment = async (req, res) => {
    try{
        const {post, user, body} = req.body;
        const comment = new Comments({
            post, user, body
        });
        const savedComment = await comment.save();

        const updatePost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
        .populate("comments")
        .exec();
        res.status(200).json(
            {
                success: true,
                data: updatePost,
                message: 'Comment Added Successfully'
            }
        )
    }
    catch(err){
        console.error(err)
        res.status(500).json(
            {
                success: false,
                data: "Error while Creating Comment",
                message: err.message,
            }
        )
    }    
}