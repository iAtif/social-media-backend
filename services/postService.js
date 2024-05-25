const Post = require("../models/post");

const createPost = async (description, image, userId) => {
  const post = new Post({ description, image, createdBy: userId });
  return post.save();
};

const getPosts = async () => {
  return Post.find()
    .populate("createdBy", "username")
    .populate("likes", "username");
};

const getPostById = async (id) => {
  return Post.findById(id)
    .populate("createdBy", "username")
    .populate("likes", "username");
};

const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    await post.save();
  }
  return post;
};

const unlikePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  const index = post.likes.indexOf(userId);
  if (index !== -1) {
    post.likes.splice(index, 1);
    await post.save();
  }
  return post;
};

const deletePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (post.createdBy.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await post.deleteOne();
};

const updatePost = async (id, description, userId) => {
  const post = await Post.findById(id);
  if (post.createdBy.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  post.description = description;
  await post.save();
  return post;
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
