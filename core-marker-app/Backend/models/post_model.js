import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
      comments: [CommentSchema],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
