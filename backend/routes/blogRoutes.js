const express = require("express");
const BlogPost  = require("../models/BlogPost.js");
const { verifyAdmin } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(blogPosts);
});

// Create a new blog post (Admin only)
router.post("/", verifyAdmin, upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newPost = new BlogPost({ title, content, fileUrl });
  await newPost.save();
  res.json(newPost);
});

// Edit a blog post (Admin only)
router.put("/:id", verifyAdmin, upload.single("file"), async (req, res) => {
  const { title, content, } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl;

  const updatedPost = await BlogPost.findByIdAndUpdate(
    req.params.id, 
    { title, content, fileUrl }, 
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
