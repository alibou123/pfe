const donationModel = require("../models/donationModel");

const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.createDonation = catchAsync(async (req, res, next) => {
  const donation = new donationModel({
    ...req.body,
    _id_volantaire: req.user._id,
  });

  await donation.save();

  res.status(201).json({
    status: "success",
    donation,
  });
});
exports.editDonation = catchAsync(async (req, res, next) => {
  const donation = await donationModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    donation,
  });
});
exports.deleteDonation = catchAsync(async (req, res, next) => {
  const donation = await donationModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
exports.validateDonation = catchAsync(async (req, res, next) => {
  const donation = await donationModel.findByIdAndUpdate(req.params.id, {
    status: "Accepted",
  });

  res.status(201).json({
    status: "success",
    donation,
  });
});

exports.affectDonation = catchAsync(async (req, res, next) => {
  const donation = await donationModel.findByIdAndUpdate(req.params.id, {
    _id_event: req.body._id_event,
    status: "Affected",
  });

  res.status(201).json({
    status: "success",
    donation,
  });
});
