const express = require("express");

const auth = require("../controllers/authenticationController");
const skillCat = require("../controllers/skillCategoryController");

const router = express.Router();

router.use(auth.protect);

router.post("/create", skillCat.createSkillCategory);
router.patch("/edit/:id", skillCat.editSkillCategory);
router.delete("/delete/:id", skillCat.deleteSkillCategory);

module.exports = router;
