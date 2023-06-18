const mongoose = require("mongoose");

const horaireSchema = new mongoose.Schema({
  _id_user: {
    type: String,
  },
  _user_first_name: {
    type: String,
  },
  _user_last_name: {
    type: String,
  },
  start_hour: {
    type: String,
  },
  end_hour: {
    type: String,
  },
  days: [String],
});

const Horaire = mongoose.model("Horaires", horaireSchema);

module.exports = Horaire;
