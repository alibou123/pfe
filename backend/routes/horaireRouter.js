const express = require("express");

const auth = require("../controllers/authenticationController");
const horaire = require("../controllers/horaireController");

const router = express.Router();

router.use(auth.protect);

router.post("/", horaire.saveHoraire);
router.patch("/edit/:id", horaire.editHoraire);
router.delete("/delete/:id", horaire.deleteHoraire);

module.exports = router;
