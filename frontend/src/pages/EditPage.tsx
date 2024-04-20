import useFetchCategories from "../hooks/useFetchCategories";
import useFetchUnits from "../hooks/useFetchUnits";
import useFetchRecipe from "../hooks/useFetchRecipe";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import AddEditRecipe from "../components/recipe/addEdit/AddEditRecipe";

const EditPage = () => {
  const { id } = useParams();
  const { categoriesData, isCategoryError, isCategoryLoading } =
    useFetchCategories();
  const { unitsData, isUnitError, isUnitLoading } = useFetchUnits();
  const { recipeData, isRecipeError, isRecipeLoading } = useFetchRecipe({
    id: id ?? "",
  });

  if (isCategoryLoading || isUnitLoading || isRecipeLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Chwilka...</p>
      </div>
    );

  if (
    isCategoryError ||
    !categoriesData ||
    isUnitError ||
    !unitsData ||
    isRecipeError ||
    !recipeData
  )
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Chwilowo nie możesz edytować swojego przepisu, przepraszamy!</p>
      </div>
    );

  return (
    <>
      <AddEditRecipe
        categories={categoriesData}
        units={unitsData}
        isEdit={true}
        editData={recipeData}
      />
    </>
  );
};

export default EditPage;
