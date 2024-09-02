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
    const { liked, userId } = req.body; // Expecting `liked` status and `userId` in the request body

    // Validate input
    if (typeof liked !== "boolean" || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data" });
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (liked) {
      if (!post.likedBy.includes(userId)) {
        post.likes += 1;
        post.likedBy.push(userId);
      }
    } else {
      if (post.likedBy.includes(userId)) {
        post.likes -= 1;
        post.likedBy = post.likedBy.filter(
          (id) => id.toString() !== userId.toString(),
        );
      }
    }

    await post.save();

    res.status(200).json({ success: true, data: post });
    console.log("Post saved with updated likes!");
  } catch (error) {
    console.error("Error updating post likes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Text and userId are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comment = { text, user: userId };
    post.comments.push(comment);
    await post.save();

    res.status(201).json({ success: true, data: post.comments });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("comments.user", "name");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post.comments });
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
