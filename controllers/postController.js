const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.user);
    if (post.err) {
      return res.status(post.err.status).json({ message: post.err.message });
    }
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
};