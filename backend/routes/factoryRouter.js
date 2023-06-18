const express = require("express");

const auth = require("../controllers/authenticationController");
const factory = require("../controllers/factoryController");

const router = express.Router();

router.get("/skills", factory.getSkillCategories);

router.get("/posts/", factory.getPostsIDS);
router.get("/posts/visible", factory.getPostsNotHIDDEN);
router.get("/post/:id", factory.getPostById);
router.get("/statistics", factory.getStatistics)

router.get("/donations", factory.getDonations);

router.use(auth.protect);

router.get("/donations/givers/", factory.getDonationsByIdGiverByID);
router.get("/donations/deliberates/", factory.getDonationsByDeliberate);

router.get("/users", factory.getUsers);
router.get("/users/givers", factory.getUsersGivers);
router.get("/users/giver/:id", factory.getUsersGiversById);
router.post("/users/skills", factory.getUsersBySkill);

router.get("/stock", factory.getStock);

router.get("/stock/types", factory.getStockTypes);
router.get("/events", factory.getEvents);

router.get("/horaire", factory.getHorarires);
router.get("/horaire/me", factory.getHorariresByIdUser);

router.get(
  "/donations/givers/by/:id",
  factory.getDonationsByIdGiverByIDByAdmin
);

module.exports = router;
