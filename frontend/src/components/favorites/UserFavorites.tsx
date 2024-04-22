import usePaginate from "../../hooks/usePaginate";
import { calculateAverageRating } from "../../utils/calculateAverage";
import { Recipe } from "../../utils/types";
import PagesList from "../shared/PagesList";
import RecipeCard from "../shared/RecipeCard";

type UserFavoritesProps = {
  recipes: Recipe[];
};

const UserFavorites = ({ recipes }: UserFavoritesProps) => {
  const {
    currentPage,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem,
    paginate,
  } = usePaginate(6);
  const numberOfPages = Math.ceil(recipes.length / itemsPerPage);
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-8/12 mx-auto mt-6">
      <h2 className="text-center mb-12">Twoje ulubione przepisy:</h2>
      <div className="flex flex-wrap justify-around gap-12 mb-12">
        {currentRecipes.map((recipe) => (
          <div key={recipe._id}>
            <RecipeCard
              recipeId={recipe._id}
              title={recipe.title}
              img={recipe.img}
              userRating={calculateAverageRating(recipe.rating)}
            />
          </div>
        ))}
      </div>
      {numberOfPages > 1 && (
        <PagesList
          arrayLength={numberOfPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default UserFavorites;
