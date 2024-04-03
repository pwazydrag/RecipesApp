import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Category } from "../utils/types";

const useFetchCategories = () => {
  const [categoriesData, setCategoriesData] = useState<Category[] | undefined>();
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  useEffect(() => {
    fetchData(`${baseUrl}/categories/`)
      .then((fetchedData) => {
        setCategoriesData(fetchedData);
        setIsCategoryLoading(false);
      })
      .catch(() => {
        setIsCategoryError(true);
        console.error("Fetch error...");
      });
  }, []);

  return { categoriesData, isCategoryError, isCategoryLoading };
};

export default useFetchCategories;
