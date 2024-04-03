import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Category } from "../../../utils/types";

type CategorySelectProps = {
  categories: Category[];
  register: any;
  errors: any;
};

const CategorySelect = ({ categories, register, errors }: CategorySelectProps) => {
  return (
    <FormControl fullWidth>
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
