const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  type_stock: {
    type: String,
  },
  product_name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
