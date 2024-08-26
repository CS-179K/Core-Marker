import Post from "../models/post_model.js";

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
  const post = req.body;

  if (!post.title || !post.description || !post.location) {
    return res
      .status(400)
      .json({ status: false, message: "please provide all fields" });
  }

  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json({ sucess: true, data: newPost });
  } catch (error) {
    console.error("Error in creating Post:", error.message);
    res.status(500).json({ sucess: false, message: "Server Eror" });
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
    res.status(200).json({ success: true, message: "post deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found" });
  }
  console.log("id:", id);
};
