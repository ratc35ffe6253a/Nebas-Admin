const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
module.exports = Volunteer;