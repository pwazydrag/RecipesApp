import { Ingredient } from "./types";

export const displayIngredient = (ingredient: Ingredient) => {
  return `${ingredient.name}: ${ingredient.amount}x ${ingredient.unit.name}`;
};
