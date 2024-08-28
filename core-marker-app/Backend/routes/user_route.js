import express from "express";
import { getUser, getUserPosts } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/me", getUser);
router.get("/:id", getUserPosts);

export default router;
