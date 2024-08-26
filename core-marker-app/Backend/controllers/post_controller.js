import Post from "../models/post_model.js";
import mongoose from "mongoose";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log("error in fetching posts", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPost = async (req, res) => {
  const { title, description, location, imageUrl } = req.body;

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
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
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
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Post not found" });
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
