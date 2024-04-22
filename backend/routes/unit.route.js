const express = require("express");
const router = express.Router();
const { getUnits } = require("../controllers/unit.controller");

router.get("/", getUnits);

module.exports = router;
