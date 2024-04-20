import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe } from "../utils/types";

const useFetchRecipes = () => {
  const [recipesData, setRecipesData] = useState<Recipe[] | undefined>();
  const [isRecipesError, setIsRecipesError] = useState(false);
  const [isRecipesLoading, setIsRecipesLoading] = useState(true);

  useEffect(() => {
    fetchData(`${baseUrl}/recipes/`)
      .then((fetchedData) => {
        setRecipesData(fetchedData);
        setIsRecipesLoading(false);
      })
      .catch(() => {
        setIsRecipesError(true);
        console.error("Fetch error...");
      });
  }, []);

  return { recipesData, isRecipesError, isRecipesLoading };
};

export default useFetchRecipes;
