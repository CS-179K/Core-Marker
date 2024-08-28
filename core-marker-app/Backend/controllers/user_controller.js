import Post from "../models/post_model.js";
import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.json({ status: "ok", user });
  } catch (error) {
    console.error("Error verifying token or fetching user:", error.message); // Log the error
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  console.log("User ID:", userId);

  try {
    const posts = await Post.find({ userId: userId });
    res.json({ success: true, data: posts });
    console.log("Posts called from database successfully");
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
