import express from "express";
import {
  getUser,
  getUserPosts,
  updateBanner,
  updateAvatar,
} from "../controllers/user_controller.js";

const router = express.Router();

router.get("/me", getUser);
router.get("/:userId", getUserPosts);
router.post("/update/avatar", updateAvatar);
router.post("/update/banner", updateBanner);
export default router;
