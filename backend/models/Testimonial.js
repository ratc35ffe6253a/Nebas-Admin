const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);
module.exports = Testimonial;
