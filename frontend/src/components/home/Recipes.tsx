import { Recipe } from "../../utils/types";
import RecipeCard from "../shared/RecipeCard";

const Recipes = ({ data }: { data: Recipe[] }) => {
  return (
    <div className="w-8/12 mx-auto">
      <div className="flex flex-wrap justify-around gap-12">
        {data.map((recipe) => (
          <RecipeCard
            recipeId={recipe._id}
            title={recipe.title}
            img={recipe.img}
            userRating={recipe.rating.map((rating) => rating.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
