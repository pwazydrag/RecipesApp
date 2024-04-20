import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe } from "../utils/types";

type UseFetchRecipeProps = {
  id: string;
};

const useFetchRecipe = ({ id }: UseFetchRecipeProps) => {
  const [recipeData, setRecipeData] = useState<Recipe | undefined>();
  const [isRecipeError, setIsRecipeError] = useState(false);
  const [isRecipeLoading, setIsRecipeLoading] = useState(true);

  useEffect(() => {
    fetchData(`${baseUrl}/recipes/${id}`)
      .then((fetchedData) => {
        setRecipeData(fetchedData);
        setIsRecipeLoading(false);
      })
      .catch(() => {
        setIsRecipeError(true);
        console.error("Fetch error...");
      });
  }, [id]);

  return { recipeData, isRecipeError, isRecipeLoading };
};

export default useFetchRecipe;
