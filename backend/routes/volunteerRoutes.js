const express = require("express");
const Volunteer = require("../models/Volunteer.js");
const { verifyAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Get all volunteer applications
router.get("/", async (req, res) => {
  const volunteers = await Volunteer.find();
  res.json(volunteers);
});

// Add a new volunteer
router.post("/", async (req, res) => {
  const { name, email, skills } = req.body;
  const newVolunteer = new Volunteer({ name, email, skills });
  await newVolunteer.save();
  res.json(newVolunteer);
});

// Edit a volunteer application (Admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { name, email, skills } = req.body;
  const updatedVolunteer = await Volunteer.findByIdAndUpdate(
    req.params.id, 
    { name, email, skills }, 
    { new: true }
  );
  res.json(updatedVolunteer);
});

// Delete a volunteer application (Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Volunteer.findByIdAndDelete(req.params.id);
  res.json({ message: "Volunteer application deleted successfully" });
});

module.exports = router;
