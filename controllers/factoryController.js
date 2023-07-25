const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Bad request",
      });
    }
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: "Invalid data sent",
      });
    }
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    try {
      const newDoc = await Model.create(req.body);

      res.status(201).json({
        status: "successfully created",
        data: {
          data: newDoc,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: error,
      });
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    try {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Bad request",
      });
    }
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    try {
      let filter = {};
      if (req.params.productId) filter = { product: req.params.productId };

      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const doc = await features.query;

      res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
          data: doc,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Bad request",
      });
    }
  });
