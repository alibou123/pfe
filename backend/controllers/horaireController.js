const horaireModel = require("../models/horarireModel");
const catchAsync = require("../utils/catchAsync");

exports.saveHoraire = catchAsync(async (req, res, next) => {
  const horaire = new horaireModel({
    ...req.body,
    _id_user: req.user._id,
    _user_first_name: req.user.first_name,
    _user_last_name: req.user.last_name,
  });

  await horaire.save();

  res.status(201).json({
    status: "success",
    horaire: horaire,
  });
});

exports.editHoraire = catchAsync(async (req, res, next) => {
  const horaire = await horaireModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    horaire: horaire,
  });
});

exports.deleteHoraire = catchAsync(async (req, res, next) => {
  const horaire = await horaireModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
