import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Category } from "../../../utils/types";
import { FormData } from "./AddRecipe";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type CategorySelectProps = {
  categories: Category[];
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

const CategorySelect = ({
  categories,
  register,
  errors,
}: CategorySelectProps) => {
  return (
    <FormControl className="flex-1">
      <InputLabel shrink error={!!errors.category}>
        Kategoria
      </InputLabel>
      <Select
        {...register("category", {
          required: "Musisz wybrać kategorię!",
        })}
        label="Kategoria"
        notched
        error={!!errors.category}
      >
        {categories.map((category) => (
          <MenuItem value={category.name} key={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {errors.category && (
        <FormHelperText error>{errors.category?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CategorySelect;
