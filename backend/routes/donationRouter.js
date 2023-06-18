const express = require("express");

const auth = require("../controllers/authenticationController");
const donation = require("../controllers/donationController");

const router = express.Router();

router.use(auth.protect);

router.post("/", donation.createDonation);
router.patch("/edit/:id", donation.editDonation);
router.patch("/affect/:id", donation.affectDonation);
router.patch("/validate/:id", donation.validateDonation);
router.delete("/delete/:id", donation.deleteDonation);

module.exports = router;
