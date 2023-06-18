const express = require("express");

const auth = require("../controllers/authenticationController");

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/forgot/password", auth.forgetPassword);
router.patch("/rest/password/:token", auth.resetPassword);

router.use(auth.protect);

router.post("/register/giver", auth.registerGiver);
router.patch("/change/password", auth.changePassword);
router.patch("/edit", auth.editAccount);
router.patch("/activate/:id", auth.validateAccount);
router.patch("/disable/:id", auth.disabledAccount);
router.patch("/set/role/:id", auth.SetRole);
router.get("/me", auth.fetchMe);

module.exports = router;
