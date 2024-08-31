import Post from "../models/post_model.js";
import mongoose from "mongoose";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name");
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log("error in fetching posts", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPost = async (req, res) => {
  const { title, description, location, imageUrl } = req.body;
  const { userId } = req.params;
  if (!title || !description || !location || !imageUrl) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newPost = new Post({
    title,
    description,
    location,
    imageUrl,
    userId,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
    console.log("post is successfully created");
  } catch (error) {
    console.error("Error in creating Post:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  try {
    const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json({ success: true, data: updatePost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updatePostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    console.log(`Received request to like post ID: ${req.params.id}`);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ success: true, data: post });
    console.log("Post saved with updated likes!");
  } catch (error) {
    console.error("Error liking post:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
