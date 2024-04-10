import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Comment } from "../utils/types";

type useFetchCommentsProps = {
  id: string;
};

const useFetchComments = ({ id }: useFetchCommentsProps) => {
  const [data, setData] = useState<Comment[] | undefined>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const refetchData = () => {
    setRefreshTrigger((value) => !value);
  };

  useEffect(() => {
    fetchData(`${baseUrl}/recipes/comments/${id}`)
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        console.error("Fetch error...");
      });
  }, [refreshTrigger]);

  return { data, isError, isLoading, refetchData };
};

export default useFetchComments;
