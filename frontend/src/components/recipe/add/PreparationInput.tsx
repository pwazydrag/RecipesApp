import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type PreparationInputProps = {
  register: any;
  unregister: any;
  errors: any;
  index: string;
  onRemove: (index: string) => void;
};

const PreparationInput = ({
  register,
  unregister,
  errors,
  index,
  onRemove,
}: PreparationInputProps) => {
  const handleStepDelete = (index: string) => {
    onRemove(index);
    unregister(`preparation.${index}`);
  };

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
            value: 100,
            message: "Nie może mieć więcej niż 100 znaków!",
          },
        })}
        error={!!errors.preparation?.[index]?.step}
        helperText={
          errors.preparation?.[index]?.step &&
          errors.preparation[index]?.step.message
        }
      />
      <div className="m-0 md:ml-5">
        <IconButton
          onClick={() => handleStepDelete(index)}
          className="hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400"
        >
          <DeleteIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default PreparationInput;
