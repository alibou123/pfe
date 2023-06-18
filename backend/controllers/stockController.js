const stockModel = require("../models/stockModel");

const catchAsync = require("../utils/catchAsync");

exports.saveStock = catchAsync(async (req, res, next) => {
  const stock = new stockModel({
    ...req.body,
  });

  await stock.save();

  res.status(201).json({
    status: "success",
    stock,
  });
});

exports.editStock = catchAsync(async (req, res, next) => {
  const stock = await stockModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    stock,
  });
});

exports.saveStock = catchAsync(async (req, res, next) => {
  const stock = await stockModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
