const stockTypeModel = require("../models/stockTypeModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createStockType = catchAsync(async (req, res, next) => {
  const stockType = new stockTypeModel({
    ...req.body,
  });

  await stockType.save();

  res.status(201).json({
    status: "success",
    stockType,
  });
});

exports.deleteStockType = catchAsync(async (req, res, next) => {
  const stockType = await stockTypeModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});

exports.editStockType = catchAsync(async (req, res, next) => {
  const stockType = await stockTypeModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    stockType,
  });
});
