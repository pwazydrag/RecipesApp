import classes from "./RecipeDetails.module.css";
import { calculateAverage } from "../../../utils/calculateAverage";
import { Recipe } from "../../../utils/types";
import Comments from "./Comments";
import Preparation from "./Preparation";
import RateRecipe from "./RateRecipe";
import Ingredients from "./Ingredients";
import RecipeGeneralInfo from "./RecipeGeneralInfo";
import Actions from "./Actions";

type RecipeDetailsProps = {
  recipe: Recipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const ratingValues = recipe.rating.map((rating) => rating.value);
  const averageRating = calculateAverage(ratingValues);

  return (
    <div className={classes.recipeDetails}>
      <RecipeGeneralInfo
        title={recipe.title}
        author={recipe.author}
        category={recipe.category}
        preparationTime={recipe.preparationTime}
        date={recipe.date}
        averageRating={averageRating}
      ></RecipeGeneralInfo>
      <Actions></Actions>
      <Ingredients ingredients={recipe.ingredients}></Ingredients>
      <Preparation preparation={recipe.preparation}></Preparation>
      <RateRecipe></RateRecipe>
      <Comments comments={recipe.comments}></Comments>
    </div>
  );
};

export default RecipeDetails;
