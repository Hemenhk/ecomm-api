const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const imageUploadRoutes = require("./routes/imageRoutes");

const upload = multer({ dest: "uploads/images" });

app.use(express.json());
app.use(cors());
// Routes

app.use("/api/products", upload.single("imageCover"), productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/image", imageUploadRoutes);

module.exports = app;
