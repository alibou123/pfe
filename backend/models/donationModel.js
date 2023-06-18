const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  _id_giver: {
    type: String,
  },
  _id_volantaire: {
    type: String,
  },
  _id_event: {
    type: String,
  },
  type_donation: {
    type: String,
  },
  product_name: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  quantity: {
    type: Number,
  },
  date_given: {
    type: Date,
  },
});

const Donations = mongoose.model("Donations", donationSchema);

module.exports = Donations;
