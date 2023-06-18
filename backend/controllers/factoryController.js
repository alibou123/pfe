// Importing Models
const postModel = require("../models/postModel");
const usersModel = require("../models/userModel");
const eventModel = require("../models/eventModel");
const stockModel = require("../models/stockModel");
const donationModel = require("../models/donationModel");
const horaireModel = require("../models/horarireModel");
const stockTypesModel = require("../models/stockTypeModel");
const skillCategoriesModel = require("../models/skillCategoryModel");

const dayjs = require("dayjs");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.getStatistics = catchAsync(async (req, res, next) => {
  const actifMembers = await usersModel.find({ role: { $nin: ["Admin", "Donneur"] } });
  const actifEvents  = await eventModel.find().sort({ start_date: -1 });
  const actifGivers = await User.find({ role: "Donneur" });

  res.status(200).json({
    actifEvents: actifEvents.length,
    actifMembers: actifMembers.length,
    actifGivers: actifGivers.length,
  })
})

// USERS FACTORY
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await usersModel.find({ role: { $nin: ["Admin", "Donneur"] } });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getUsersBySkill = catchAsync(async (req, res, next) => {
  const users = await usersModel.find({
    skill: { $in: req.body.skills },
    role: { $nin: ["Admin", "Donneur"] },
  });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getUsersGivers = catchAsync(async (req, res, next) => {
  const givers = await User.find({ role: "Donneur" });

  res.status(200).json({
    status: "success",
    givers,
  });
});

exports.getUsersGiversById = catchAsync(async (req, res, next) => {
  const givers = await User.find({ added_by: req.params.id });

  res.status(200).json({
    status: "success",
    givers,
  });
});

// DONATIONS FACTORY
exports.getDonations = catchAsync(async (req, res, next) => {
  const donations = await donationModel.aggregate([
    {
      $lookup: {
        from: "users",
        let: { giverId: { $toObjectId: "$_id_giver" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$giverId"],
              },
            },
          },
          {
            $project: {
              first_name: 1,
              last_name: 1,
            },
          },
        ],
        as: "giverDetails",
      },
    },
    {
      $unwind: "$giverDetails",
    },
    {
      $project: {
        _id: 1,
        type_donation: 1,
        product_name: 1,
        status: 1,
        quantity: 1,
        _id_event: 1,
        date_given: 1,
        giver_first_name: "$giverDetails.first_name",
        giver_last_name: "$giverDetails.last_name",
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    donations,
  });
});

exports.getDonationsByIdGiver = catchAsync(async (req, res, next) => {
  const donations = await donationModel.find({ _id_giver: req.user._id });

  res.status(200).json({
    status: "success",
    donations,
  });
});

exports.getDonationsByIdGiverByIDByAdmin = catchAsync(
  async (req, res, next) => {
    const donations = await donationModel.find({ _id_giver: req.params.id });

    res.status(200).json({
      status: "success",
      donations,
    });
  }
);

exports.getDonationsByIdGiverByID = catchAsync(async (req, res, next) => {
  const donations = await donationModel.find({ _id_giver: req.user._id });

  res.status(200).json({
    status: "success",
    donations,
  });
});

exports.getDonationsByDeliberate = catchAsync(async (req, res, next) => {
  const donations = await donationModel.aggregate([
    {
      $lookup: {
        from: "users",
        let: { giverId: { $toObjectId: "$_id_giver" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$giverId"],
              },
            },
          },
          {
            $project: {
              first_name: 1,
              last_name: 1,
            },
          },
        ],
        as: "giverDetails",
      },
    },
    {
      $unwind: "$giverDetails",
    },
    {
      $project: {
        _id: 1,
        type_donation: 1,
        product_name: 1,
        status: 1,
        _id_volantaire: 1,
        quantity: 1,
        date_given: 1,
        giver_first_name: "$giverDetails.first_name",
        giver_last_name: "$giverDetails.last_name",
      },
    },
    {
      $match: {
        _id_volantaire: req.user._id.toString(),
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    donations,
  });
});

// EVENTS FACTORY
exports.getEvents = catchAsync(async (req, res, next) => {
  const events = await eventModel.find().sort({ start_date: -1 });

  res.status(200).json({
    status: "success",
    events,
  });
});
exports.getEventsById = catchAsync(async (req, res, next) => {
  const event = await eventModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    event,
  });
});
exports.getEventsByIdDeliberate = catchAsync(async (req, res, next) => {
  const full_name = req.body.first_name + " " + req.body.last_name;
  const events = await eventModel.find({ deliberates: { $all: [full_name] } });

  res.status(200).json({
    status: "success",
    events,
  });
});

// POST FACTORY
exports.getPostsIDS = catchAsync(async (req, res, next) => {
  const posts = await postModel.find().select({ _id: 1 });

  res.status(200).json({
    status: "success",
    posts,
  });
});

exports.getPostsNotHIDDEN = catchAsync(async (req, res, next) => {
  const posts = await postModel.find({ status: "Visible" });

  res.status(200).json({
    status: "success",
    posts,
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    post,
  });
});

// STOCK AND STOCK-TYPE FACTORY
exports.getStock = catchAsync(async (req, res, next) => {
  const stock = await stockModel.find({ status: "Accepted" });

  res.status(200).json({
    status: "success",
    stock: stock,
  });
});

exports.getStockTypes = catchAsync(async (req, res, next) => {
  const stockTypes = await stockTypesModel.find();

  res.status(200).json({
    status: "success",
    stockTypes,
  });
});

// SKILL CATEGORY FACTORY
exports.getSkillCategories = catchAsync(async (req, res, next) => {
  const skillCategories = await skillCategoriesModel.find();

  res.status(200).json({
    status: "success",
    skillCategories,
  });
});

// HORAIRE FACTORY
exports.getHorarires = catchAsync(async (req, res, next) => {
  const horaires = await horaireModel.find();

  res.status(200).json({
    status: "success",
    horaires,
  });
});
exports.getHorariresByIdUser = catchAsync(async (req, res, next) => {
  const horaires = await horaireModel.find({
    _id_user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    horaires,
  });
});
