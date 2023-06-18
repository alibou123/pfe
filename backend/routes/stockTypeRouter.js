const express = require("express");

const auth = require("../controllers/authenticationController");
const stockType = require("../controllers/stockTypeController");

const router = express.Router();

router.use(auth.protect);

router.post("/", stockType.createStockType);
router.patch("/edit/:id", stockType.editStockType);
router.delete("/delete/:id", stockType.deleteStockType);

module.exports = router;
