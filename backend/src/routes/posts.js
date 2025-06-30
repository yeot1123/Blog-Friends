const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authenticate = require('../../middleware/auth');
const upload = require('../../middleware/upload_blog_photo');

router.get('/', postsController.getAllPosts);
router.get('/:postId', postsController.getPostById);  //GET /api/posts/:postId
router.post('/createPost', authenticate, upload.single('image'), postsController.createPost);




module.exports = router;
