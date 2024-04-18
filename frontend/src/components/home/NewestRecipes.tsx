import { Recipe } from "../../utils/types";
import RecipeCard from "../shared/RecipeCard";
import usePaginate from "../../hooks/usePaginate";
import { calculateAverageRating } from "../../utils/calculateAverage";
import PagesList from "../shared/PagesList";

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
      <h2 className="text-center my-12">Najnowsze przepisy</h2>
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
      <PagesList
        arrayLength={3}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default NewestRecipes;
