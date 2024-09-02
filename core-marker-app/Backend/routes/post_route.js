import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  updatePostLikes,
  deletePost,
  getPostsByUser,
  addComment,
  getComments,
} from "../controllers/post_controller.js";

const router = express.Router();

// returns all posts
router.get("/", getAllPosts);

// creates a post
router.post("/:userId", createPost);

// updates a post
router.put("/:id", updatePost);

//updates like of a post
router.put("/:postId/likes", updatePostLikes);

// deletes a post by id
router.delete("/:id", deletePost);

// returns posts by user
router.get("/user/:userId", getPostsByUser);

//add a comment to post
router.post("/:postId/comments", addComment);

// get all comments for a post
router.get("/:postId/comments", getComments);

export default router;
