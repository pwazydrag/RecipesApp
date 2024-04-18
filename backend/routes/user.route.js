const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/user.controller");

router.get("/", getUser);
router.get("/:id", getUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
