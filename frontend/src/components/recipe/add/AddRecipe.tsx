import { useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./AddRecipe.module.css";
import { Category, Unit } from "../../../utils/types";
import CategorySelect from "./CategorySelect";
import { TextField } from "@mui/material";
import IngredientInput from "./IngredientInput";
import PreparationInput from "./PreparationInput";

type FormData = {
  title: string;
  preparationTime: number;
  category: string;
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unit: string;
  }[];
  preparation: {
    id: string;
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
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      category: "",
      preparationTime: 0,
      ingredients: [],
      preparation: [],
      img: "",
    },
    mode: "onBlur",
  });

  const [idCount, setIdCount] = useState<number>(2);
  const [ingredients, setIngredients] = useState<FormData["ingredients"]>([
    {
      id: `0`,
      name: "",
      amount: 0,
      unit: "",
    },
  ]);

  const handleIncrement = () => {
    setIdCount((prevIdCount) => prevIdCount + 1);
  };

  const addIngredient = () => {
    const newIngredient = {
      id: `${idCount}`,
      name: "",
      amount: 0,
      unit: "",
    };
    setIngredients([...ingredients, newIngredient]);
    handleIncrement();
  };

  const removeIngredient = (idToRemove: string) => {
    if (ingredients.length > 1) {
      const updatedIngredients = ingredients.filter(
        (ingredient) => ingredient.id !== idToRemove
      );
      setIngredients(updatedIngredients);
    }
  };

  const [preparationSteps, setPreparationSteps] = useState<
    FormData["preparation"]
  >([
    {
      id: `1`,
      step: "",
    },
  ]);

  const addPreparationStep = () => {
    const newStep = {
      id: `${idCount}`,
      step: "",
    };
    setPreparationSteps([...preparationSteps, newStep]);
    handleIncrement();
  };

  const removePreparationStep = (idToRemove: string) => {
    if (preparationSteps.length > 1) {
      const updatedPreparationSteps = preparationSteps.filter(
        (step) => step.id !== idToRemove
      );
      setPreparationSteps(updatedPreparationSteps);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
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
          sx={{ minWidth: 150 }}
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
      {ingredients.map((ingredient) => (
        <IngredientInput
          key={ingredient.id}
          units={units}
          index={ingredient.id}
          register={register}
          unregister={unregister}
          errors={errors}
          onRemove={() => removeIngredient(ingredient.id)}
        />
      ))}
      <button type="button" className={classes.addBtn} onClick={addIngredient}>
        Dodaj kolejny składnik
      </button>
      <h4>Napisz krok po kroku jak przygotować przepis </h4>
      {preparationSteps.map((step) => (
        <PreparationInput
          key={step.id}
          index={step.id}
          register={register}
          unregister={unregister}
          errors={errors}
          onRemove={() => removePreparationStep(step.id)}
        />
      ))}
      <button
        type="button"
        className={classes.addBtn}
        onClick={addPreparationStep}
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
