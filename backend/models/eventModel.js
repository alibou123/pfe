const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  _id_category: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  skills: [String],
  members: [String],
  deliberates: [String],
  presence: [
    {
      date: String,
      users: [
        {
          name: String,
          value: Boolean,
        },
      ],
    },
  ],
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
