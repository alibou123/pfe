const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id_event: {
    type: String,
  },
  post_title: {
    type: String,
  },
  post_description: {
    type: String,
  },
  pictures: [{ base64: String, name: String }],
  status: String,
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
