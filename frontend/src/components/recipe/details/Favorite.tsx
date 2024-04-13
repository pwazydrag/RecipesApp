import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import classes from "./Favorite.module.css";
import { baseUrl } from "../../../utils/constant";
import { postDataAuth } from "../../../utils/postData";
import { fetchData } from "../../../utils/fetchData";

const Favorite = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    token &&
      id &&
      fetchData(`${baseUrl}/recipes/favorites/${token}/${id}`).then(
        (fetchedData) => {
          if (fetchedData === "exist") setIsFavorite(true);
        }
      );
  }, [token]);

  const handleFavoriteChange = async () => {
    const data = {
      recipeId: id,
    };
    const response = await postDataAuth(
      `${baseUrl}/recipes/favorites/`,
      data,
      token
    );
    if (response.status === 200) {
      setIsError(false);
      setIsFavorite(!isFavorite);
    } else if (response.status === 401) {
      setIsError(true);
    } else {
      console.error(
        "Wystąpił błąd podczas zapisywania! Spróbuj ponownie później"
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-[#f4e8e8fe] rounded-3xl border border-gray-300 p-7 2xl:p-12 shadow-md w-[12rem]">
        <h3 className="whitespace-nowrap">Ulubione</h3>
        <button
          type="button"
          onClick={handleFavoriteChange}
          className={isFavorite ? classes.favBtnDel : classes.favBtnAdd}
        >
          {isFavorite ? `Usuń` : `Zapisz`}
        </button>
      </div>
      {isError && <p className="text-red-500">Zaloguj się zapisać!</p>}
    </div>
  );
};

export default Favorite;
