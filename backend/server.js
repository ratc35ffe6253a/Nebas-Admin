const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { verifyAdmin } = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/orphanage";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use("/api/auth", authRoutes);

// Protect admin-only routes
app.get("/api/admin/dashboard", verifyAdmin, (req, res) => {
  res.send("Orphanage API is running...");
  res.json({ message: "Welcome to the admin dashboard!" });
});

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
