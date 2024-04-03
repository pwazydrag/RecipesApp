import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classes from "./AddRecipe.module.css";
import { Category, Unit } from "../../../utils/types";
import CategorySelect from "./CategorySelect";
import { TextField } from "@mui/material";
import IngredientInput from "./IngredientInput";
import PreparationInput from "./PreparationInput";
import { useAuth } from "../../../hooks/useAuth";
import { baseUrl } from "../../../utils/constant";
import { postDataAuth } from "../../../utils/postData";

export type FormData = {
  title: string;
  preparationTime: number;
  category: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  preparation: {
    step: string;
  }[];
  img: string;
};

type AddRecipeProps = {
  categories: Category[];
  units: Unit[];
};

const AddRecipe = ({ categories, units }: AddRecipeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      category: "",
      preparationTime: 0,
      ingredients: [{ name: "", amount: 0, unit: "" }],
      preparation: [{ step: "" }],
      img: "",
    },
    mode: "onBlur",
  });

  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  });

  const preparation = useFieldArray({
    control,
    name: "preparation",
  });

  const { token } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const response = await postDataAuth(`${baseUrl}/recipe/`, data, token);
    if (response.status === 200) {
      setIsError(false);
      navigate("/");
    } else if (response.status === 500) {
      setIsError(true);
    } else {
      console.error(
        "Wystąpił błąd podczas wysyłania przepisu! Spróbuj ponownie później"
      );
      setIsError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes.addForm} w-8/12 md:w-9/12 lg:w-7/12 p-11 mt-4 mx-auto`}
    >
      <h2>Dodaj przepis</h2>
      <h4>Generalne informacje</h4>
      <TextField
        label="Tytuł przepisu"
        InputLabelProps={{ shrink: true }}
        multiline
        {...register("title", {
          required: "Musisz podać tytuł!",
          minLength: {
            value: 6,
            message: "Tytuł musi mieć przynajmniej 6 znaków!",
          },
          maxLength: {
            value: 60,
            message: "Tytuł nie może mieć więcej niż 60 znaków!",
          },
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      ></TextField>
      <div className="flex gap-5">
        <TextField
          className="flex-1"
          label="Czas przygotowania (minuty)"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          InputLabelProps={{ shrink: true }}
          {...register("preparationTime", {
            required: "Musisz podać czas przygotowania!",
            min: {
              value: 1,
              message: "Czas przygotowania musi być większy od 0!",
            },
            max: {
              value: 1440,
              message:
                "Czas przygotowania nie może przekroczyć 1440 minut (24 godziny)!",
            },
          })}
          error={!!errors.preparationTime}
          helperText={errors.preparationTime?.message}
        />
        <CategorySelect
          categories={categories}
          register={register}
          errors={errors}
        ></CategorySelect>
      </div>
      <h4 className="mt-4 mb-2">Lista składników</h4>
      {ingredients.fields.map((ingredient, index) => (
        <IngredientInput
          key={ingredient.id}
          units={units}
          index={index}
          register={register}
          errors={errors}
          onRemove={() => ingredients.remove(index)}
        />
      ))}
      <button
        type="button"
        className={classes.addBtn}
        onClick={() =>
          ingredients.append(
            { name: "", amount: 0, unit: "" },
            { shouldFocus: false }
          )
        }
      >
        Dodaj kolejny składnik
      </button>
      <h4>Napisz krok po kroku jak przygotować przepis </h4>
      {preparation.fields.map((step, index) => (
        <PreparationInput
          key={step.id}
          index={index}
          register={register}
          errors={errors}
          onRemove={() => preparation.remove(index)}
        />
      ))}
      <button
        type="button"
        className={classes.addBtn}
        onClick={() => preparation.append({ step: "" }, { shouldFocus: false })}
      >
        Dodaj kolejny krok
      </button>
      <h4>Dodaj zdjęcie przepisu</h4>
      <TextField
        label="Link do zdjęcia"
        InputLabelProps={{ shrink: true }}
        {...register("img", {
          required: "Musisz podać adres URL do zdjęcia przepisu!!",
          minLength: {
            value: 20,
            message: "Twój link nie jest poprawny!",
          },
          maxLength: {
            value: 10000,
            message: "Na pewno link nie jest za długi?",
          },
        })}
        error={!!errors.img}
        helperText={errors.img?.message}
      ></TextField>
      <button type="submit" className={`${classes.submitBtn} mt-3`}>
        Dodaj przepis
      </button>
    </form>
  );
};

export default AddRecipe;
