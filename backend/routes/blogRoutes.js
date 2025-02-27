const express = require("express");
const BlogPost  = require("../models/BlogPost.js");
const { verifyAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(blogPosts);
});

// Create a new blog post (Admin only)
router.post("/", verifyAdmin, async (req, res) => {
  const { title, content, imageUrl, videoUrl } = req.body;
  const newPost = new BlogPost({ title, content, imageUrl, videoUrl });
  await newPost.save();
  res.json(newPost);
});

// Edit a blog post (Admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { title, content, imageUrl, videoUrl } = req.body;
  const updatedPost = await BlogPost.findByIdAndUpdate(
    req.params.id, 
    { title, content, imageUrl, videoUrl }, 
    { new: true }
  );
  res.json(updatedPost);
});

// Delete a blog post (Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog post deleted successfully" });
});

module.exports = router;
