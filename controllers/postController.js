const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const image = req.file.filename;
    const userId = req.user._id;

    const post = await postService.createPost(description, image, userId);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully.",
      total: posts.length,
      post: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postService.getPostById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Post retrieved successfully.",
        post: post,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await postService.likePost(postId, userId);
    res.json(post);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await postService.unlikePost(postId, userId);
    res.json(post);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    await postService.deletePost(id, userId);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    const userId = req.user.id;
    const post = await postService.updatePost(id, description, userId);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Post updated successfully.",
        post: post,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePost,
  updatePost,
};
