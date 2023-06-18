const express = require("express");

const auth = require("../controllers/authenticationController");

const router = express.Router();

router.use(auth.protect);

module.exports = router;
