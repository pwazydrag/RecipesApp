import { UseFormRegister } from "react-hook-form";
import { FormData } from "./SearchRecipe";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField } from "@mui/material";

type IngredientSearchProps = {
  register: UseFormRegister<FormData>;
  index: number;
  onRemove: () => void;
};

const IngredientSearch = ({
  register,
  index,
  onRemove,
}: IngredientSearchProps) => {
  return (
    <div className="flex flex-row">
      <TextField
        fullWidth
        label="Nazwa składnika"
        InputLabelProps={{ shrink: true }}
        {...register(`ingredients.${index}.name`)}
      />
      <div className="m-0 md:ml-5">
        <IconButton
          onClick={onRemove}
          className="hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400"
        >
          <DeleteIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default IngredientSearch;
