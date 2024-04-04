import { Ingredient } from "../../../utils/types";
import { displayIngredient } from "../../../utils/displayIngredients";

type IngredientsProps = {
  ingredients: Ingredient[];
};

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <div className="text-left">
      <br />
      <h3>Lista składników:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index} className="mt-2">{displayIngredient(ingredient)}</li>
        ))}
      </ul>
      <br />
    </div>
  );
};

export default Ingredients;
