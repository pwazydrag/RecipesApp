import usePaginate from "../../hooks/usePaginate";
import { calculateAverageRating } from "../../utils/calculateAverage";
import { Recipe } from "../../utils/types";
import PagesList from "../shared/PagesList";
import RecipeCard from "../shared/RecipeCard";
import UserRecipesActions from "./UserRecipesActions";

type UserRecipesProps = {
  recipes: Recipe[];
  isUserOwnProfile: boolean;
  refetchData: () => void;
};

const UserRecipes = ({
  recipes,
  isUserOwnProfile,
  refetchData,
}: UserRecipesProps) => {
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
    <div className="mt-6">
      <div className="flex flex-wrap justify-around gap-12 mb-12">
        {currentRecipes.map((recipe) => (
          <div>
            {isUserOwnProfile && (
              <UserRecipesActions
                recipeId={recipe._id}
                refetchData={refetchData}
              />
            )}
            <RecipeCard
              key={recipe._id}
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

export default UserRecipes;
