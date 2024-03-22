import { useParams } from "react-router-dom";
import useFetchRecipe from "../hooks/useFetchRecipe";
import RecipeDetails from "../components/recipe/RecipeDetails";

const DetailsPage = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useFetchRecipe({
    id: id ?? "",
  });

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div>
        <p>Ten przepis nie istnieje...</p>
      </div>
    );

  return (
    <div>
      <RecipeDetails
        recipe={data}
      />
    </div>
  );
};

export default DetailsPage;
