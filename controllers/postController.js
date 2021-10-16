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

const getPosts = async (_req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params);
    if (post.err) {
      return res.status(post.err.status).json({ message: post.err.message });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const post = await postService.editPost(req.params, req.body, req.user);
    if (post.err) {
      return res.status(post.err.status).json({ message: post.err.message });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params, req.user);
    if (post.err) {
      return res.status(post.err.status).json({ message: post.err.message });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
};