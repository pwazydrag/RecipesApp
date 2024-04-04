import { Ingredient } from "./types";

const displayIngredient = (ingredient: Ingredient) => {
    return `${ingredient.name}: ${ingredient.amount}x ${ingredient.unit.name}`;
};

export { displayIngredient };
