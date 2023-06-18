const skillCategoryModel = require("../models/skillCategoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createSkillCategory = catchAsync(async (req, res, next) => {
  const skillCategory = new skillCategoryModel({
    ...req.body,
  });

  await skillCategory.save();

  res.status(201).json({
    status: "success",
    skillCategory,
  });
});

exports.editSkillCategory = catchAsync(async (req, res, next) => {
  let skillCategory = await skillCategoryModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name }
  );

  res.status(201).json({
    status: "success",
    skillCategory,
  });
});

exports.deleteSkillCategory = catchAsync(async (req, res, next) => {
  const skillCategory = await skillCategoryModel.findByIdAndDelete(
    req.params.id
  );

  res.status(204).json({
    status: "success",
  });
});
