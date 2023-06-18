const postModel = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.savePost = catchAsync(async (req, res, next) => {
  const post = new postModel({
    ...req.body,
  });

  await post.save();

  res.status(201).json({
    status: "success",
  });
});

exports.editPost = catchAsync(async (req, res, next) => {
  const post = await postModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  res.status(201).json({
    status: "success",
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await postModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});

exports.changeVisiblity = catchAsync(async (req, res, next) => {
  const post = await postModel.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });

  res.status(201).json({
    status: "success",
    post,
  });
});
