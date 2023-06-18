const mongoose = require("mongoose");

const stockTypeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const stockType = mongoose.model("StockTypes", stockTypeSchema);

module.exports = stockType;
