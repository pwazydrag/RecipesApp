import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe } from "../utils/types";

type UseFetchRecipeProps = {
  id: string;
};

const useFetchRecipe = ({ id }: UseFetchRecipeProps) => {
  const [data, setData] = useState<Recipe | undefined>();
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
  }, [id]);

  return { data, isError, isLoading };
};

export default useFetchRecipe;
