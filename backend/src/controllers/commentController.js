const { Comment, Post, User } = require('../models');

// GET all comments (no search)
exports.getComment = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Post, attributes: ['title'] }
      ],
      order: [['createdAt', 'DESC']]  // เรียงตามเวลาล่าสุด
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// POST create comment
exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    if (!content || !postId) {
      return res.status(400).json({ error: 'content and postId are required' });
    }

    const comment = await Comment.create({
      content,
      postId,
      userId: req.userId // from authenticate middleware
    });

    const fullComment = await Comment.findOne({
      where: { commentId: comment.commentId },
      include: [{ model: User, attributes: ['username'] }]
    });

    const io = req.app.get('io');
    io.emit('newcomment', fullComment);

    res.status(201).json(fullComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};
