const express = require("express");

const auth = require("../controllers/authenticationController");
const post = require("../controllers/postController");

const router = express.Router();

router.use(auth.protect);

router.post("/", post.savePost);
router.patch("/edit/:id", post.editPost);
router.patch("/visibility/:id", post.changeVisiblity);
router.delete("/delete/:id", post.deletePost);

module.exports = router;
