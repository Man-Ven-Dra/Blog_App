const Post = require("../models/postModel")

exports.createPost = async (req, res) => {
    try{
        const {title, body} = req.body;
        const post = new Post({
            title, body
        })
        const savedPost = await post.save();
        res.status(200).json(
            {
                success: true,
                data: savedPost,
                message: 'Post Added Successfully'
            }
        )
    }
    catch(err){
        console.error(err)
        res.status(500).json(
            {
                success: false,
                data: "Error while Creating Post",
                message: err.message,
            }
        )
    }
}

exports.getPost = async (req, res) => {
    try{
        const posts = await Post.find({})
        .populate("likes")
        .populate("comments")
        .exec()
        res.status(200).json(
            {
                success: true,
                data: posts,
                message: 'Posts Fetched Successfully.'
            }
        )
    }
    catch(err){
        console.error(err)
        res.status(500).json(
            {
                success: false,
                data: "Failed to Fetch Posts",
                message: err.message,
            }
        )
    }
}