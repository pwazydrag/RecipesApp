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
    <div className="flex flex-col w-8/12 my-4 mx-auto text-center">
      <RecipeGeneralInfo
        title={recipe.title}
        author={recipe.author}
        category={recipe.category}
        preparationTime={recipe.preparationTime}
        date={recipe.date}
        averageRating={calculateAverageRating(recipe.rating)}
        img={recipe.img}
      ></RecipeGeneralInfo>
      <Actions likes={recipe.likes.length}></Actions>
      <Ingredients ingredients={recipe.ingredients}></Ingredients>
      <Preparation preparation={recipe.preparation}></Preparation>
      <Comments recipeId={recipe._id}></Comments>
    </div>
  );
};

export default RecipeDetails;
