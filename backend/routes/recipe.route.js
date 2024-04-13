const express = require("express");
const Recipe = require("../models/recipe.model");
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controllers/recipe.controller");
const Comment = require("../models/comment.model");
const {
  addComment,
  getComments,
} = require("../controllers/comment.controller");
const Favorite = require("../models/favorite.model");
const {
  changeFavorite,
  getFavorite,
} = require("../controllers/favorite.controller");
const Rate = require("../models/rate.model");
const { addRate, getRate } = require("../controllers/rate.controller");

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.get("/comments/:id", getComments);
router.get("/favorites/:user/:id", getFavorite);
router.get("/rates/:user/:id", getRate);

router.post("/", createRecipe);
router.post("/search", searchRecipes);
router.post("/comments", addComment);
router.post("/favorites", changeFavorite);
router.post("/rates", addRate);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
