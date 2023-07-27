const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");
const factory = require("./factoryController");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = async (req, res, next) => {
  try {
    const imageCover = req.files["imageCover"][0];
    const images = req.files["images"];

    // Upload imageCover to Cloudinary
    const imageCoverResult = await cloudinary.uploader.upload(imageCover.path, {
      folder: "product_images",
    });

    // Save the public URL of the image to the req object for later use
    req.body.imageCover = imageCoverResult.secure_url;

    // Upload images to Cloudinary using Promise.all
    const imageUploadPromises = images.map((image) => {
      return cloudinary.uploader.upload(image.path, {
        folder: "product_images",
      });
    });

    // Wait for all images to be uploaded and save their public URLs to the req object
    const imagesResults = await Promise.all(imageUploadPromises);
    req.body.images = imagesResults.map((result) => result.secure_url);

    next();
  } catch (err) {
    next(err);
  }
};

exports.resizeProductImages = (req, res, next) => {
  console.log(req.files);
  next();
};

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: "reviews" });
exports.createProduct = factory.createOne(Product, "imageCover", "images");
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
