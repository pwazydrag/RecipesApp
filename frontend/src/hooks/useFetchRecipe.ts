import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";

type UseFetchRecipeProps = {
  id: string;
};

const useFetchRecipe = ({ id }: UseFetchRecipeProps) => {
  type Recipe = {
    _id: string;
    title: string;
    authorId: string;
    category: string;
    preparationTime: number;
    ingredients: string[];
    preparation: string[];
    rating: number[];
  };

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
  }, []);

  return { data, isError, isLoading };
};

export default useFetchRecipe;
