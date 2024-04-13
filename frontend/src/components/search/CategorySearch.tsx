import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Category } from "../../utils/types";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "./SearchRecipe";

type CategorySearchProps = {
  categories: Category[];
  register: UseFormRegister<FormData>;
};

const CategorySearch = ({ categories, register }: CategorySearchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3>Szukaj po kategorii</h3>
      <FormControl fullWidth>
        <InputLabel shrink>Kategoria</InputLabel>
        <Select {...register("category")} label="Kategoria" notched>
          {categories.map((category) => (
            <MenuItem value={category.name} key={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategorySearch;
