const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(cors());
// Routes

app.use("/api/products", productRoutes);

module.exports = app;
