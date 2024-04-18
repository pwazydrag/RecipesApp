import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Category } from "../../utils/types";
import { Control, Controller } from "react-hook-form";
import { FormData } from "./SearchRecipe";

type CategorySearchProps = {
  categories: Category[];
  control: Control<FormData>;
};

const CategorySearch = ({ categories, control }: CategorySearchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3>Szukaj po kategorii</h3>
      <FormControl fullWidth>
        <InputLabel shrink>Kategoria</InputLabel>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select {...field} label="Kategoria" notched>
              {categories.map((category) => (
                <MenuItem value={category.name} key={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </div>
  );
};

export default CategorySearch;
