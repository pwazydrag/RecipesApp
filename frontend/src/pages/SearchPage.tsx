import useFetchCategories from "../hooks/useFetchCategories";
import SearchRecipe from "../components/search/SearchRecipe";
import { CircularProgress } from "@mui/material";

const RegisterPage = () => {
  const { categoriesData, isCategoryError, isCategoryLoading } =
    useFetchCategories();

  if (isCategoryLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Chwilka...</p>
      </div>
    );

  if (isCategoryError || !categoriesData)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Chwilowo nie możesz wyszukać przepisów, przepraszamy!</p>
      </div>
    );

  return (
    <>
      <SearchRecipe categories={categoriesData} />
    </>
  );
};

export default RegisterPage;
