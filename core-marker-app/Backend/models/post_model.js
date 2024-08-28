// models/post_model.js

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "no description provided",
    },
    likes: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      required: false,
    }],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
