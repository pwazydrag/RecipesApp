import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe } from "../utils/types";

const useFetchFavorites = () => {
  const [favoritesData, setFavoritesData] = useState<Recipe[] | undefined>();
  const [isFavoritesError, setIsFavoritesError] = useState(false);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchData(`${baseUrl}/users/favorites/?token=${token}`)
      .then((fetchedData) => {
        setFavoritesData(fetchedData);
        setIsFavoritesLoading(false);
      })
      .catch(() => {
        setIsFavoritesError(true);
        console.error("Fetch error...");
      });
  }, []);

  return { favoritesData, isFavoritesError, isFavoritesLoading };
};

export default useFetchFavorites;
