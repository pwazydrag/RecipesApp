import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { baseUrl } from "../../utils/constant";
import { deleteData } from "../../utils/deleteData";

type UserRecipesActionsProps = {
  recipeId: string;
  refetchData: () => void;
};

const UserRecipesActions = ({
  recipeId,
  refetchData,
}: UserRecipesActionsProps) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const deleteRecipe = async () =>
    await deleteData(`${baseUrl}/recipes/${recipeId}`, token).then(refetchData);

  const editRecipe = async () => {
    navigate(`/edit/${recipeId}`);
  };

  return (
    <div className="flex justify-between">
      <h3
        onClick={editRecipe}
        className="flex-1 hover:transition-all hover:ease-in-out hover:text-yellow-400 active:text-yellow-400 cursor-pointer"
      >
        Edytuj
      </h3>
      <h3
        onClick={deleteRecipe}
        className="flex-1 hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400 cursor-pointer"
      >
        Usuń
      </h3>
    </div>
  );
};

export default UserRecipesActions;
