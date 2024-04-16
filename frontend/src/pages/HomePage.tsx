import { CircularProgress } from "@mui/material";
import Home from "../components/home/Home";
import useFetchRecipes from "../hooks/useFetchRecipes";

const HomePage = () => {
  const { data, isError, isLoading } = useFetchRecipes();

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy przepisy...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś poszło nie tak - przepraszamy!</p>
      </div>
    );

  return (
    <>
      <Home data={data} />
    </>
  );
};

export default HomePage;
