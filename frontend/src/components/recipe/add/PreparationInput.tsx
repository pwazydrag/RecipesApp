import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormData } from "./AddRecipe";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type PreparationInputProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  index: number;
  onRemove: () => void;
};

const PreparationInput = ({
  register,
  errors,
  index,
  onRemove,
}: PreparationInputProps) => {
  return (
    <div className="flex">
      <TextField
        className="w-full"
        multiline
        label="Krok"
        InputLabelProps={{ shrink: true }}
        {...register(`preparation.${index}.step`, {
          required: "Opisz krok lub usuń!",
          minLength: {
            value: 6,
            message: "Musi mieć przynajmniej 6 znaków!",
          },
          maxLength: {
            value: 200,
            message: "Nie może mieć więcej niż 200 znaków!",
          },
        })}
        error={!!errors.preparation?.[index]?.step}
        helperText={errors.preparation?.[index]?.step?.message}
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

export default PreparationInput;
