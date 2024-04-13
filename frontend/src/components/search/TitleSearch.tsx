import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "./SearchRecipe";

type TitleSearchProps = {
  register: UseFormRegister<FormData>;
};

const TitleSearch = ({ register }: TitleSearchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3>Szukaj po nazwie</h3>
      <TextField
        fullWidth
        label="Tytuł przepisu"
        InputLabelProps={{ shrink: true }}
        {...register("title")}
      />
    </div>
  );
};

export default TitleSearch;
