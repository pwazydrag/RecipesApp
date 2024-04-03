import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Unit } from "../../../utils/types";
import DeleteIcon from "@mui/icons-material/Delete";

type IngredientInputProps = {
  units: Unit[];
  register: any;
  unregister: any;
  errors: any;
  index: string;
  onRemove: (index: string) => void;
};

const IngredientInput = ({
  units,
  index,
  register,
  unregister,
  errors,
  onRemove,
}: IngredientInputProps) => {
  const handleIngredientDelete = (index: string) => {
    onRemove(index);
    unregister(`ingredients.${index}`);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-3 w-full">
        <TextField
          className="w-full"
          label="Nazwa składnika"
          InputLabelProps={{ shrink: true }}
          {...register(`ingredients.${index}.name`, {
            required: "Podaj nazwę lub usuń!",
            minLength: {
              value: 6,
              message: "Musi mieć przynajmniej 6 znaków!",
            },
            maxLength: {
              value: 40,
              message: "Nie może mieć więcej niż 40 znaków!",
            },
          })}
          error={!!errors.ingredients?.[index]?.name}
          helperText={
            errors.ingredients?.[index]?.name &&
            errors.ingredients[index]?.name.message
          }
        />
        <div className="flex gap-3 justify-between">
          <TextField
            label="Ilość"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            InputLabelProps={{ shrink: true }}
            {...register(`ingredients.${index}.amount`, {
              required: "Wpisz liczbę!",
              min: {
                value: 1,
                message: "Ilość musi być większa od 0!",
              },
              max: {
                value: 100000,
                message: "Wybierz tak, aby nie przekraczać 100000!",
              },
            })}
            error={!!errors.ingredients?.[index]?.amount}
            helperText={
              errors.ingredients?.[index]?.amount &&
              errors.ingredients[index]?.amount.message
            }
          />
          <FormControl fullWidth sx={{ minWidth: 160 }}>
            <InputLabel shrink error={!!errors.ingredients?.[index]?.unit}>
              Jednostka
            </InputLabel>
            <Select
              {...register(`ingredients.${index}.unit`, {
                required: "Wybierz jednostkę!",
              })}
              label="Jednostka"
              notched
              error={!!errors.ingredients?.[index]?.unit}
            >
              {units.map((unit) => (
                <MenuItem value={unit.name} key={unit._id}>
                  {unit.name}
                </MenuItem>
              ))}
            </Select>
            {errors.ingredients?.[index]?.unit && (
              <FormHelperText error>
                {errors.ingredients[index]?.unit &&
                  errors.ingredients[index]?.unit.message}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
      <div className="m-0 md:ml-5">
        <IconButton
          onClick={() => handleIngredientDelete(index)}
          className="hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400"
        >
          <DeleteIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default IngredientInput;
