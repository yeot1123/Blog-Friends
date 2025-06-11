
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../../middleware/auth');


// POST create comment
router.post('/createComment', authenticate, commentController.createComment);

// GET all comments
router.get('/', commentController.getComment);

module.exports = router;
