const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: "" }, // Store image URL
  videoUrl: { type: String, default: "" }, // Store video URL
  createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
