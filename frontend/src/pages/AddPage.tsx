import useFetchCategories from "../hooks/useFetchCategories";
import useFetchUnits from "../hooks/useFetchUnits";
import { CircularProgress } from "@mui/material";
import AddEditRecipe from "../components/recipe/addEdit/AddEditRecipe";

const AddPage = () => {
  const { categoriesData, isCategoryError, isCategoryLoading } =
    useFetchCategories();
  const { unitsData, isUnitError, isUnitLoading } = useFetchUnits();

  if (isCategoryLoading || isUnitLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Chwilka...</p>
      </div>
    );

  if (isCategoryError || !categoriesData || isUnitError || !unitsData)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Chwilowo nie możesz dodać przepisu, przepraszamy!</p>
      </div>
    );

  return (
    <>
      <AddEditRecipe
        categories={categoriesData}
        units={unitsData}
        isEdit={false}
      />
    </>
  );
};

export default AddPage;
