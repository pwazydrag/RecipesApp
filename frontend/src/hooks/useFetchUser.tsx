import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Recipe, User } from "../utils/types";
import { useAuth } from "./useAuth";

type UserFetchData = {
  user: User;
  check: boolean;
  userRecipes: Recipe[];
};

type UseFetchUserProps = {
  id?: string;
};

const useFetchUser = ({ id }: UseFetchUserProps) => {
  const [userData, setUserData] = useState<UserFetchData | undefined>();
  const [isUserError, setIsUserError] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const refetchUserData = () => {
    setRefreshTrigger((value) => !value);
  };
  const { token } = useAuth();

  useEffect(() => {
    fetchData(`${baseUrl}/users/${id ?? ""}?token=${token}`)
      .then((fetchedData) => {
        setUserData(fetchedData);
        setIsUserLoading(false);
      })
      .catch(() => {
        setIsUserError(true);
        console.error("Fetch error...");
      });
  }, [token, refreshTrigger]);

  return { userData, isUserError, isUserLoading, refetchUserData };
};

export default useFetchUser;
