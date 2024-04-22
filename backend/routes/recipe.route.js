const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
} = require("../controllers/recipe.controller");
const {
  addComment,
  getComments,
} = require("../controllers/comment.controller");
const {
  changeFavorite,
  getFavorite,
} = require("../controllers/favorite.controller");
const { addRate, getRate } = require("../controllers/rate.controller");

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.get("/comments/:id", getComments);
router.get("/favorites/:id", getFavorite);
router.get("/rates/:id", getRate);

router.post("/", createRecipe);
router.post("/search", searchRecipes);
router.post("/comments", addComment);
router.post("/favorites", changeFavorite);
router.post("/rates", addRate);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
