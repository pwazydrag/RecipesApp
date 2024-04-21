import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Category, Recipe, Unit } from "../../../utils/types";
import CategorySelect from "./CategorySelect";
import { TextField } from "@mui/material";
import IngredientInput from "./IngredientInput";
import PreparationInput from "./PreparationInput";
import { useAuth } from "../../../hooks/useAuth";
import { baseUrl } from "../../../utils/constant";
import { postDataAuth } from "../../../utils/postData";
import { updateData } from "../../../utils/updateData";
import Button from "../../shared/Button";

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

type AddEditRecipeProps = {
  categories: Category[];
  units: Unit[];
  isEdit: boolean;
  editData?: Recipe;
};

const AddEditRecipe = ({
  categories,
  units,
  isEdit,
  editData,
}: AddEditRecipeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      title: isEdit && editData ? editData.title : "",
      category: isEdit && editData ? editData.category.name : "",
      preparationTime: isEdit && editData ? editData.preparationTime : 0,
      ingredients:
        isEdit && editData
          ? editData.ingredients.map((ingredient) => ({
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit.name,
            }))
          : [{ name: "", amount: 0, unit: "" }],
      preparation:
        isEdit && editData
          ? editData.preparation.map((step) => ({ step }))
          : [{ step: "" }],
      img: isEdit && editData ? editData.img : "",
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
    let response;
    if (isEdit && editData) {
      response = await updateData(
        `${baseUrl}/recipes/${editData._id}`,
        data,
        token
      );
    } else {
      response = await postDataAuth(`${baseUrl}/recipes`, data, token);
    }
    if (response.status === 200) {
      setIsError(false);
      navigate(`/details/${response.data._id}`);
    } else if (response.status === 401) {
      setIsError(true);
    } else {
      console.error(
        "Wystąpił błąd podczas wysyłania przepisu! Spróbuj ponownie później"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-8/12 md:w-9/12 lg:w-7/12 mt-4 mx-auto gap-10"
    >
      <h2>{isEdit ? "Edytuj przepis" : "Dodaj przepis"}</h2>
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
      />
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
        />
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
      <Button
        type="button"
        text="Dodaj kolejny składnik"
        mode="ingrPrep"
        onClick={() =>
          ingredients.append(
            { name: "", amount: 0, unit: "" },
            { shouldFocus: false }
          )
        }
      />
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
      <Button
        type="button"
        text="Dodaj kolejny krok"
        mode="ingrPrep"
        onClick={() => preparation.append({ step: "" }, { shouldFocus: false })}
      />
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
      />
      {isError && (
        <p className="text-red-500">Coś poszło nie tak! Spróbuj ponownie</p>
      )}
      <Button
        type="submit"
        text={isEdit ? "Edytuj przepis" : "Dodaj przepis"}
      />
    </form>
  );
};

export default AddEditRecipe;
