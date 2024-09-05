const express = require('express');
const {createComment} = require('../controllers/commentController')
const {likePost, unlikePost} = require('../controllers/likeController')
const {createPost, getPost} = require('../controllers/postController')
const router = express.Router();

router.post('/comments/create/', createComment)
router.post('/post/create/', createPost)
router.post('/likePost/', likePost)
router.post('/unlikePost/', unlikePost)
router.get('/post/get/', getPost)

module.exports = router;