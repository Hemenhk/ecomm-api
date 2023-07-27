const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const app = express();
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const imageUploadRoutes = require("./routes/imageRoutes");

const upload = multer({ dest: "uploads/images" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });

app.use(express.json());
app.use(cors());
// Routes

app.use(
  "/api/products",
  upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 3 },
  ]),
  productRoutes
);
app.use("/api/reviews", reviewRoutes);
app.use("/api/image", imageUploadRoutes);

module.exports = app;
