import usePaginate from "../../hooks/usePaginate";
import { calculateAverageRating } from "../../utils/calculateAverage";
import { Recipe } from "../../utils/types";
import RecipeCard from "../shared/RecipeCard";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PagesList from "../shared/PagesList";

type SearchResultProps = {
  recipes: Recipe[];
  hideResults: () => void;
};

const SearchResult = ({ recipes, hideResults }: SearchResultProps) => {
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
    <div className="w-8/12 mx-auto">
      <div className="flex mt-12">
        <IconButton
          onClick={hideResults}
          className="hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400"
          sx={{ color: "black" }}
        >
          <ArrowBackIcon sx={{ width: 30, height: 30 }} />
          <h4 className="ml-4">Powrót</h4>
        </IconButton>
      </div>
      <h2 className="text-center mb-12">Wyniki wyszukiwania:</h2>
      <div className="flex flex-wrap justify-around gap-12 mb-12">
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

export default SearchResult;
