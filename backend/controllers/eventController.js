const Event = require("../models/eventModel");
const AppError = require("../utils/appError");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");

exports.registerEvent = catchAsync(async (req, res, next) => {
  const event = new Event({
    ...req.body,
  });

  await event.save();

  event.members.forEach(async (element) => {
    const user = await userModel.findOne({
      first_name: element.split(" ")[0],
      last_name: element.split(" ")[1],
    });

    const emailOptions = {
      email: user.email,
      subject: "Nouvelle evenement a été enregistrée",
      html: `<p>Cher ${user.first_name + " " + user.last_name}<br />
       Vous avez été invité à participer à un nouvel événement (${
         event.name
       })<br />
      Consultez votre compte pour plus de détails`,
    };
    setTimeout(() => {
      sendEmail(emailOptions);
    }, [500]);
  });
  event.deliberates.forEach(async (element) => {
    const user = await userModel.findOne({
      first_name: element.split(" ")[0],
      last_name: element.split(" ")[1],
    });

    const emailOptions = {
      email: user.email,
      subject: "Nouvelle evenement a été enregistrée",
      html: `<p>Cher ${user.first_name + " " + user.last_name}<br />
       Vous avez été invité à participer à un nouvel événement (${
         event.name
       })<br />
      Consultez votre compte pour plus de détails`,
    };
    setTimeout(() => {
      sendEmail(emailOptions);
    }, [500]);
  });

  res.status(201).json({
    status: "success",
    event: event,
  });
});

exports.editEvent = catchAsync(async (req, res, next) => {
  let event = await Event.findByIdAndUpdate(req.params.id, { ...req.body });

  res.status(201).json({
    status: "success",
    event: event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  await Event.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});

exports.dailyPresenceValidation = catchAsync(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  event.presence.push(req.body.presence);

  await event.save();

  res.status(201).json({
    status: "success",
  });
});

exports.unableToJoin = catchAsync(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (event.deliberates.find((elem) => elem === req.body.fullName)) {
    event.deliberates = event.deliberates.filter(
      (elem) => elem !== req.body.fullName
    );
  } else if (event.members.find((elem) => elem === req.body.fullName)) {
    event.members = event.members.filter((elem) => elem !== req.body.fullName);
  }

  await event.save();

  res.status(201).json({
    status: "success",
  });
});
