import { Ingredient } from "../../utils/types";
import classes from "./Ingredients.module.css";
import { displayIngredient } from "../../utils/displayIngredients";

type IngredientsProps = {
  ingredients: Ingredient[];
};

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <div className={classes.ingredients}>
      <p>Lista składników:</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{displayIngredient(ingredient)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
