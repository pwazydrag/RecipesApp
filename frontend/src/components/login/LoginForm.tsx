import { useState } from "react";
import classes from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { baseUrl } from "../../utils/constant";
import { postDataNotAuth } from "../../utils/postData";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { login } = useAuth();
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const response = await postDataNotAuth(`${baseUrl}/users/login`, data);
    if (response.status === 200) {
      setIsError(false);
      login(response.data);
      navigate("/");
    } else if (response.status === 401) {
      setIsError(true);
    } else {
      console.error(
        "Wystąpił błąd podczas logowania! Spróbuj ponownie później"
      );
      setIsError(true);
    }
  };

  return (
    <form
      className={`${classes.loginForm} w-9/12 md:w-6/12 lg:w-4/12 p-11 mt-4 mx-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Logowanie</h2>
      <div className="flex flex-col gap-12">
        <TextField
          label="Nazwa użytkownika"
          InputLabelProps={{ shrink: true }}
          {...register("username", {
            required: "Nazwa użytkownika jest wymagana!",
            minLength: {
              value: 6,
              message: "Nazwa użytkownika musi mieć przynajmniej 6 znaków!",
            },
            maxLength: {
              value: 20,
              message: "Nazwa użytkownika nie może mieć więcej niż 20 znaków!",
            },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          className={classes.formInput}
        ></TextField>
        <TextField
          label="Hasło"
          InputLabelProps={{ shrink: true }}
          type="password"
          {...register("password", {
            required: "Hasło jest wymagane!",
            minLength: {
              value: 6,
              message: "Hasło musi mieć przynajmniej 6 znaków!",
            },
            maxLength: {
              value: 20,
              message: "Hasło nie może mieć więcej niż 20 znaków!",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          className={classes.formInput}
        ></TextField>
        {isError && (
          <p className="text-red-500">
            Błędne dane logowania! Spróbuj ponownie
          </p>
        )}
        <button type="submit" className={classes.submitBtn}>
          Zaloguj się
        </button>
        <Link
          to="/register"
          className="no-underline hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400"
        >
          Nie posiadasz konta? Zarejestruj się!
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
