const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = mongoose.Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
