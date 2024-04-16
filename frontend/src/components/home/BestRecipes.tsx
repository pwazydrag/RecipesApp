import usePaginate from "../../hooks/usePaginate";
import { calculateAverageRating } from "../../utils/calculateAverage";
import { Recipe } from "../../utils/types";
import RecipeCard from "../shared/RecipeCard";

type BestRecipesProps = {
  data: Recipe[];
};

const BestRecipes = ({ data }: BestRecipesProps) => {
  const { currentPage, indexOfFirstItem, indexOfLastItem, paginate } =
    usePaginate(6);

  const sortRecipesByAverageRating = (recipes: Recipe[]): Recipe[] => {
    return recipes.sort((a, b) => {
      const avgRatingA = calculateAverageRating(a.rating);
      const avgRatingB = calculateAverageRating(b.rating);
      return avgRatingB - avgRatingA;
    });
  };

  const sortedRecipes = sortRecipesByAverageRating(data);
  const currentRecipes = sortedRecipes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-16">
      <h2 className="text-center my-12">Najwyżej oceniane przepisy</h2>
      <div className="flex flex-wrap justify-around gap-12">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipeId={recipe._id}
            title={recipe.title}
            img={recipe.img}
            userRating={calculateAverageRating(recipe.rating)}
          />
        ))}
      </div>
      <ul className="flex justify-center mt-8 mb-8 list-none">
        {Array.from({ length: 3 }, (_, i) => (
          <li
            key={i}
            className={`mx-2 cursor-pointer ${
              currentPage === i + 1 ? "font-bold" : ""
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestRecipes;
