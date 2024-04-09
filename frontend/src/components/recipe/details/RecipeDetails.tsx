import classes from "./RecipeDetails.module.css";
import { calculateAverage } from "../../../utils/calculateAverage";
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
