const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(express.json());
app.use(cors());
// Routes

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

module.exports = app;
