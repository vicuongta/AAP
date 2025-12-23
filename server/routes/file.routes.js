const express = require("express");
const path = require("path");
const multer = require("multer");
const User = require("../models/user.model");

const router = express.Router();

const MAX_BYTES = 20 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const allowedMime = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

const upload = multer({
  storage,
  limits: { fileSize: MAX_BYTES },
  fileFilter: (req, file, cb) => {
    if (!allowedMime.has(file.mimetype)) return cb(new Error("Invalid file type"));
    cb(null, true);
  }
});

// Upload for a user (simplest: pass userId)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        file: {
          filename: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: req.file.path
        }
      },
      { new: true }
    );

    res.json({ message: "Uploaded", user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
