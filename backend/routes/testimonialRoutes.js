const express = require("express");
const Testimonial = require("../models/Testimonial.js");
const { verifyAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all testimonials
router.get("/", async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

// Add a new testimonial
router.post("/", async (req, res) => {
  const { name, message } = req.body;
  const newTestimonial = new Testimonial({ name, message });
  await newTestimonial.save();
  res.json(newTestimonial);
});

// Edit a testimonial (Admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, message } = req.body;
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id, 
    { name, message }, 
    { new: true }
  );
  res.json(updatedTestimonial);
});

// Delete a testimonial (Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Testimonial deleted successfully" });
});

module.exports = router;
