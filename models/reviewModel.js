const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A review can not be empty"],
      trim: true,
      maxLength: [500, "A review must have less than 500 characters"],
      minLength: [1, "A review must have at least 1 character"],
    },
    title: {
      type: String,
      required: [true, "A title can not be empty"],
      trim: true,
      maxLength: [100, "A title must have less than 500 characters"],
      minLength: [1, "A title must have at least 1 character"],
    },
    rating: {
      type: Number,
      required: [true, "A review must have a rating"],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    author: {
      type: String,
      required: [true, "A review must have an author"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.product);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
