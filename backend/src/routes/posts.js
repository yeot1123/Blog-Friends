const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authenticate = require('/Users/thanaboon/Documents/side-project/blod-freinds/backend/middleware/auth.js'); // <-- เพิ่มตรงนี้


router.get('/', postsController.getAllPosts);
router.get('/:postId', postsController.getPostById);  //GET /api/posts/:postId
router.post('/createPost', authenticate, postsController.createPost);




module.exports = router;
