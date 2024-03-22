import { Ingredient } from "./types";

const displayIngredient = (ingredient: Ingredient) => {
    return `${ingredient.name}: ${ingredient.amount} ${ingredient.unit.name}`;
};

export { displayIngredient };
