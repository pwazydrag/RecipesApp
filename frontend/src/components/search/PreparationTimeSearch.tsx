import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./SearchRecipe";

type PreparationTimeSearchProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

const PreparationTimeSearch = ({
  register,
  errors,
}: PreparationTimeSearchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3>Szukaj po czasie przygotowania (minuty)</h3>
      <div className="flex flex-col md:flex-row gap-12">
        <TextField
          className="flex-1"
          label="Minimalny czas"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{ shrink: true }}
          {...register("minTime", {
            min: {
              value: 0,
              message: "Nie podawaj ujemnych wartości!",
            },
            max: {
              value: 1440,
              message:
                "Czas przygotowania nie może przekroczyć 1440 minut (24 godziny)!",
            },
          })}
          error={!!errors.minTime}
          helperText={errors.minTime?.message}
        />
        <TextField
          className="flex-1"
          label="Maksymalny czas"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{ shrink: true }}
          {...register("maxTime", {
            min: {
              value: 0,
              message: "Nie podawaj ujemnych wartości!",
            },
            max: {
              value: 1440,
              message:
                "Czas przygotowania nie może przekroczyć 1440 minut (24 godziny)!",
            },
          })}
          error={!!errors.maxTime}
          helperText={errors.maxTime?.message}
        />
      </div>
    </div>
  );
};

export default PreparationTimeSearch;
