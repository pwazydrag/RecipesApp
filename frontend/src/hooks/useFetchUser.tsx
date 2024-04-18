import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { User } from "../utils/types";
import { useAuth } from "./useAuth";

type UserFetchData = {
  user: User;
  check: boolean;
};

type UseFetchUserProps = {
  id?: string;
};

const useFetchUser = ({ id }: UseFetchUserProps) => {
  const [data, setData] = useState<UserFetchData | undefined>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchData(`${baseUrl}/users/${id ?? ""}?token=${token}`)
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        console.error("Fetch error...");
      });
  }, [id, token]);

  return { data, isError, isLoading };
};

export default useFetchUser;
