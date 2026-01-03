const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use("/uploads", express.static("uploads")); // so files are reachable
app.use(cors({
  origin: 'http://localhost:5173', // Adjust as needed
  credentials: true,
}));

// Build folder
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Serve React app
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});