const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const upload = multer({ dest: "uploads/images" });

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res
      .status(200)
      .json({ imageUrl: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
