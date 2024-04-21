import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { TextField } from "@mui/material";

import { baseUrl } from "../../../utils/constant";
import { postDataAuth } from "../../../utils/postData";
import Button from "../../shared/Button";

type FormData = {
  comment: string;
  recipeId: string;
};

type newCommentProps = {
  hasComments: boolean;
  refetchData: () => void;
};

const NewComment = ({ hasComments, refetchData }: newCommentProps) => {
  const { token } = useAuth();
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      comment: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    const recipeId = id ? id : "";
    data = {
      ...data,
      recipeId: recipeId,
    };
    const response = await postDataAuth(
      `${baseUrl}/recipes/comments/`,
      data,
      token
    );
    if (response.status === 200) {
      setIsError(false);
      refetchData();
      reset();
    } else if (response.status === 401) {
      setIsError(true);
    } else {
      console.error(
        "Wystąpił błąd podczas dodawania komentarza! Spróbuj ponownie później"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 bg-white rounded-2xl border border-solid border-red-300 shadow-md px-5 mt-5 mb-12"
    >
      {hasComments && <h3 className="mt-6">Dodaj nowy komentarz!</h3>}
      {!hasComments && (
        <h3 className="mt-6">Bądź pierwszą osobą która skomentuje!</h3>
      )}
      <TextField
        label="Treść"
        fullWidth
        multiline
        InputLabelProps={{ shrink: true }}
        {...register("comment", {
          required: "Nie możesz zostawić pustego komentarza!",
          minLength: {
            value: 5,
            message: "Twój komentarz jest za krótki!",
          },
          maxLength: {
            value: 400,
            message: "Twój komentarz jest za długi!",
          },
        })}
        error={!!errors.comment}
        helperText={errors.comment?.message}
      ></TextField>
      {isError && <p className="text-red-500">Zaloguj się aby skomentować!</p>}
      <div className="flex flex-col my-5">
        <Button type="submit" text="Skomentuj" />
      </div>
    </form>
  );
};

export default NewComment;
