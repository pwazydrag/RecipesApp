const express = require("express");
const Recipe = require("../models/recipe.model");
const router = express.Router();
const { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipe.controller");

router.get("/", getRecipes);
router.get("/:id", getRecipe);

router.post("/", createRecipe);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
