const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      trim: true,
      maxLength: [250, "A product must have less or equal to 250 chars"],
      minLength: [1, "A product must have more or equal to 10 chars"],
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    categories: {
      type: [
        {
          type: String,
          enum: ["beard", "hair"],
        },
      ],
      required: true,
    },
    ingredients: {
      type: String,
      required: [true, "A product must have ingredients"],
      trim: true,
    },
    usage: {
      type: String,
      required: [true, "A product must have usage"],
      trim: true,
    },
    atricleNumber: {
      type: String,
      required: [true, "A product must have an article number"],
      maxLength: [10, "A product must have less or equal to 10 chars"],
      minLength: [5, "A product must have more or equal to 5 chars"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Ratings must be above 1.0"],
      max: [5, "Ratings must be 5.0 or less"],
    },
    imageCover: {
      type: String,
      required: [true, "A product must have an image cover"],
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
