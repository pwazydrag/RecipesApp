import { useParams } from "react-router-dom";
import useFetchRecipe from "../hooks/useFetchRecipe";
import RecipeDetails from "../components/recipe/details/RecipeDetails";
import { CircularProgress } from "@mui/material";

const DetailsPage = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useFetchRecipe({
    id: id ?? "",
  });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy twój przepis...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś nie tak z Twoim przepisem - przepraszamy!</p>
      </div>
    );

  return (
    <>
      <RecipeDetails recipe={data} />
    </>
  );
};

export default DetailsPage;
