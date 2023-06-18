const mongoose = require("mongoose");

const skilLCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const SkillCategory = mongoose.model("SkillCategories", skilLCategorySchema);

module.exports = SkillCategory;
