const multer = require('multer');
const path = require('path');

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// File filter to accept only images/videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and MP4 videos are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;