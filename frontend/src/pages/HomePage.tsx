import { CircularProgress } from "@mui/material";
import Home from "../components/home/Home";
import useFetchRecipes from "../hooks/useFetchRecipes";

const HomePage = () => {
  const { recipesData, isRecipesError, isRecipesLoading } = useFetchRecipes();

  if (isRecipesLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy przepisy...</p>
      </div>
    );

  if (isRecipesError || !recipesData)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś poszło nie tak - przepraszamy!</p>
      </div>
    );

  return (
    <>
      <Home data={recipesData} />
    </>
  );
};

export default HomePage;
