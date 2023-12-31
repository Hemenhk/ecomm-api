const express = require("express");
const productController = require("../controllers/productController");
const reviewRoutes = require("../routes/reviewRoutes");

const router = express.Router();

router.use("/:productId/reviews", reviewRoutes);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.uploadProductImages, productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.uploadProductImages, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
