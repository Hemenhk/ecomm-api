const Review = require("../models/reviewModel");
const factory = require("./factoryController");


exports.setProductId = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};


exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review)
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
