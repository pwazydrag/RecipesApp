import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Category } from "../../utils/types";
import NameSearch from "./TitleSearch";
import CategorySearch from "./CategorySearch";
import PreparationTimeSearch from "./PreparationTimeSearch";
import IngredientSearch from "./IngredientSearch";
import { baseUrl } from "../../utils/constant";
import { postDataNotAuth } from "../../utils/postData";
import classes from "./SearchRecipe.module.css";

export type FormData = {
  title: string;
  category: string;
  minTime: number;
  maxTime: number;
  ingredients: { name: "" }[];
};

type SearchRecipeProps = {
  categories: Category[];
};

const SearchRecipe = ({ categories }: SearchRecipeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      category: "",
      minTime: 0,
      maxTime: 0,
      ingredients: [{ name: "" }],
    },
    mode: "onBlur",
  });
  const [isError, setIsError] = useState(false);

  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: FormData) => {
    const response = await postDataNotAuth(`${baseUrl}/recipes/search`, data);
    if (response.status === 200) {
      if (response.data.length > 0) {
        setIsError(false);
        //wyniki wyszukiwania
      } else {
        setIsError(true);
      }
    } else {
      console.error(
        "Wystąpił błąd podczas wysyłania przepisu! Spróbuj ponownie później"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-8/12 md:w-9/12 lg:w-7/12 p-11 mt-4 mx-auto"
    >
      <NameSearch register={register} />
      <CategorySearch categories={categories} register={register} />
      <PreparationTimeSearch register={register} errors={errors} />
      <h3>Wyszukaj po składnikach</h3>
      <div className="flex flex-col gap-12 mt-4">
        {ingredients.fields.map((ingredient, index) => (
          <IngredientSearch
            key={ingredient.id}
            index={index}
            register={register}
            onRemove={() => ingredients.remove(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className={`${classes.addBtn} mt-8`}
        onClick={() => ingredients.append({ name: "" }, { shouldFocus: false })}
      >
        Dodaj kolejny składnik
      </button>
      {isError && (
        <p className="text-red-500 text-center mt-6">
          Nie odnaleźliśmy żadnych przepisów!
        </p>
      )}
      <button type="submit" className={`${classes.submitBtn} mt-12`}>
        Wyszukaj przepisy
      </button>
    </form>
  );
};

export default SearchRecipe;
