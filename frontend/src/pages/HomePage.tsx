import Recipes from "../components/home/Recipes";
import useFetchRecipes from "../hooks/useFetchRecipes";

const HomePage = () => {
  const { data, isError, isLoading } = useFetchRecipes();

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div>
        <p>Coś nie tak z twoimi przepisami!</p>
      </div>
    );

  return (
    <div>
      <Recipes data={data} />
    </div>
  );
};

export default HomePage;
