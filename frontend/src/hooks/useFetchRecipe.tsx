import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe, Comment } from "../utils/types";

type Data = {
  recipe: Recipe;
  comments: Comment[];
};

type UseFetchRecipeProps = {
  id: string;
};

const useFetchRecipe = ({ id }: UseFetchRecipeProps) => {
  const [data, setData] = useState<Data | undefined>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(`${baseUrl}/recipes/${id}`)
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        console.error("Fetch error...");
      });
  }, []);

  return { data, isError, isLoading };
};

export default useFetchRecipe;
