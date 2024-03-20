import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe } from "../utils/types";

const useFetchRecipes = () => {
  const [data, setData] = useState<Recipe[] | undefined>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(`${baseUrl}/recipes/`)
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

export default useFetchRecipes;
