import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Rating from "@mui/material/Rating";
import { baseUrl } from "../../../utils/constant";
import { postDataAuth } from "../../../utils/postData";
import { fetchData } from "../../../utils/fetchData";

const RateRecipe = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const [userStarRating, setUserStarRating] = useState<number | null>(null);

  useEffect(() => {
    token &&
      id &&
      fetchData(`${baseUrl}/recipes/rates/${id}?token=${token}`).then(
        (fetchedData) => {
          setUserStarRating(fetchedData?.value);
        }
      );
  }, [token]);

  const handleUserStarRating = async (
    event: ChangeEvent<{}>,
    newValue: number | null
  ) => {
    const data = {
      value: newValue,
      recipeId: id,
    };
    setUserStarRating(newValue);
    const response = await postDataAuth(
      `${baseUrl}/recipes/rates/`,
      data,
      token
    );
    if (response.status === 200) {
      setIsError(false);
    } else if (response.status === 401) {
      setIsError(true);
    } else {
      console.error(
        "Wystąpił błąd podczas oceniania! Spróbuj ponownie później"
      );
    }
  };

  return (
    <div>
      <div className="mt-16 md:mt-0 bg-[#f4e8e8fe] rounded-3xl border border-gray-300 p-7 2xl:p-12 shadow-md w-[12rem]">
        <h3>Oceń przepis</h3>
        <Rating
          name="userRating"
          value={userStarRating}
          onChange={handleUserStarRating}
          precision={0.5}
        ></Rating>
      </div>
      {isError && <p className="text-red-500">Zaloguj się aby ocenić!</p>}
    </div>
  );
};

export default RateRecipe;
