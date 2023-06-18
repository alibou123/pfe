const express = require("express");

const auth = require("../controllers/authenticationController");
const event = require("../controllers/eventController");

const router = express.Router();

router.use(auth.protect);

router.post("/create", event.registerEvent);
router.patch("/edit/:id", event.editEvent);
router.patch("/presence/:id", event.dailyPresenceValidation);
router.patch("/delibrate/presence/:id", event.unableToJoin);
router.delete("/delete/:id", event.deleteEvent);

module.exports = router;
