import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post_controller.js";
const router = express.Router();

// returns all posts
router.get("/", getAllPosts);

// creates a post
router.post("/", createPost);

//updates a post
router.put("/:id", updatePost);

// deletes a post by id
router.delete("/:id", deletePost);

export default router;
