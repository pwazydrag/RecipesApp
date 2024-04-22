const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUserFavorites,
} = require("../controllers/user.controller");

router.get("/", getUser);
router.get("/favorites", getUserFavorites);
router.get("/:id", getUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
