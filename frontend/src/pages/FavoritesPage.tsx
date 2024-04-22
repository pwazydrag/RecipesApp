import UserFavorites from "../components/favorites/UserFavorites";
import useFetchFavorites from "../hooks/useFetchFavorites";
import { CircularProgress } from "@mui/material";

const FavoritesPage = () => {
  const { favoritesData, isFavoritesError, isFavoritesLoading } =
    useFetchFavorites();

  if (isFavoritesLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy ulubione przepisy...</p>
      </div>
    );

  if (isFavoritesError || !favoritesData)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś poszło nie tak - przepraszamy!</p>
      </div>
    );

  return (
    <>
      <UserFavorites recipes={favoritesData} />
    </>
  );
};

export default FavoritesPage;
