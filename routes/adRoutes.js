const express = require("express");
const router = express.Router();
const { createAd, getAds } = require("../controllers/adController");

router.post("/anuncios", createAd);
router.get("/anuncios", getAds);

module.exports = router;
