import { Recipe } from "../../utils/types";
import RecipeCard from "../shared/RecipeCard";
import usePaginate from "../../hooks/usePaginate";

type NewestRecipesProps = {
  data: Recipe[];
};

const NewestRecipes = ({ data }: NewestRecipesProps) => {
  const { currentPage, indexOfFirstItem, indexOfLastItem, paginate } =
    usePaginate(6);
  const recipes = data.reverse();
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2 className="text-center mt-12 mb-12">Najnowsze przepisy</h2>
      <div className="flex flex-wrap justify-around gap-12">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipeId={recipe._id}
            title={recipe.title}
            img={recipe.img}
            userRating={recipe.rating.map((rating) => rating.value)}
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

export default NewestRecipes;
