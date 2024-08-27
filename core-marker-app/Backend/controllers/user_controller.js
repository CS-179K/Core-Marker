import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    console.log("User found:", user);
    res.json({ status: "ok", user });
  } catch (error) {
    console.log("Error verifying token or fetching user:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
};
