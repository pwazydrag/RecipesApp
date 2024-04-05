const express = require("express");
const Rate = require("../models/rate.model");
const router = express.Router();
const { addRate, getRate } = require("../controllers/rate.controller");

router.post("/", addRate);
router.get("/:user/:id", getRate);

module.exports = router;
