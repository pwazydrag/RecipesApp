import classes from "./RecipeDetails.module.css";
import { calculateAverageRating } from "../../../utils/calculateAverage";
import { Recipe } from "../../../utils/types";
import Comments from "./Comments";
import Preparation from "./Preparation";
import Ingredients from "./Ingredients";
import RecipeGeneralInfo from "./RecipeGeneralInfo";
import Actions from "./Actions";

type RecipeDetailsProps = {
  recipe: Recipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  return (
    <div className={classes.recipeDetails}>
      <RecipeGeneralInfo
        title={recipe.title}
        author={recipe.author}
        category={recipe.category}
        preparationTime={recipe.preparationTime}
        date={recipe.date}
        averageRating={calculateAverageRating(recipe.rating)}
        img={recipe.img}
      ></RecipeGeneralInfo>
      <Actions></Actions>
      <Ingredients ingredients={recipe.ingredients}></Ingredients>
      <Preparation preparation={recipe.preparation}></Preparation>
      <Comments recipeId={recipe._id}></Comments>
    </div>
  );
};

export default RecipeDetails;
