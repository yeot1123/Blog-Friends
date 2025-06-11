
const { Post, Comment, User } = require('../models');


// GET /api/posts/:id
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { postId },
      include: [
        { model: User, attributes: ['username'] },  // เจ้าของโพสต์
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }]  // คอมเมนต์ + คนคอมเมนต์
        }
      ]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// POST /api/posts
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({
      title,
      content,
      userId: req.userId}); // userId มาจาก middleware auth

    const io = req.app.get('io');
    io.emit('newPost', newPost)

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};
