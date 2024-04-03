const express = require("express");
const Category = require("../models/category.model");
const router = express.Router();
const { getCategories } = require("../controllers/category.controller");

router.get("/", getCategories);

module.exports = router;
