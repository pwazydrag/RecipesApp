import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Comment } from "../../../utils/types";
import { displayDate } from "../../../utils/displayDate";
import { TextField } from "@mui/material";
import classes from "./Comments.module.css";

type FormData = {
  comment: string;
};

type CommentsProps = {
  comments: Comment[];
};

const Comments = ({ comments }: CommentsProps) => {
  const { token } = useAuth();
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      comment: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="text-left">
      <div>
        {comments.length > 0 && <h3>Komentarze:</h3>}
        {comments.map((commentSingle: Comment) => (
          <div
            key={commentSingle._id}
            className="bg-white rounded-2xl border border-solid border-red-300 shadow-md px-5 mt-5"
          >
            <h4 className="mt-4">
              <span>{commentSingle.author.username}</span>
              <span className="font-semibold">
                , {displayDate(new Date(commentSingle.commentDate))}
              </span>
            </h4>
            <p>{commentSingle.comment}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-white rounded-2xl border border-solid border-red-300 shadow-md px-5 mt-5"
      >
        {comments.length > 0 && <h3 className="mt-6">Dodaj nowy komentarz!</h3>}
        {!comments.length && (
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
        {isError && (
          <p className="text-red-500">Zaloguj się aby skomentować!</p>
        )}
        <button type="submit" className={`${classes.submitBtn} mb-7`}>
          Skomentuj
        </button>
      </form>
    </div>
  );
};

export default Comments;
