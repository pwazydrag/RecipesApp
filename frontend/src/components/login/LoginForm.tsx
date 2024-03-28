import { useState } from "react";
import classes from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { baseUrl } from "../../utils/constant";
import { postDataNotAuth } from "../../utils/postData";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const responseData = await postDataNotAuth(
        `${baseUrl}/users/login`,
        data
      );
      if (responseData === "exist") {
        console.log("Pomyślnie zalogowano!");
        setIsError(false);
        //ustawić że użytkownik zalogowany, przenieść na stronę główną, schować w nawigacji rejestrację/logowanie i pokazać wyloguj
      } else if (responseData === "notexist") {
        console.log("Nieprawidłowe dane logowania!");
        setIsError(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Logowanie</h2>
        <div className={classes.inputs}>
          <TextField
            label="Nazwa użytkownika"
            {...register("username", {
              required: "Nazwa użytkownika jest wymagana!",
              minLength: {
                value: 6,
                message: "Nazwa użytkownika musi mieć przynajmniej 6 znaków!",
              },
              maxLength: {
                value: 20,
                message:
                  "Nazwa użytkownika nie może mieć więcej niż 20 znaków!",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            className={classes.formInput}
          ></TextField>
          <TextField
            label="Hasło"
            type="password"
            {...register("password", {
              required: "Hasło jest wymagane!",
              minLength: {
                value: 6,
                message: "Hasło musi mieć przynajmniej 6 znaków!",
              },
              maxLength: {
                value: 20,
                message: "Haśło nie może mieć więcej niż 20 znaków!",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            className={classes.formInput}
          ></TextField>
        </div>
        <button type="submit" className={classes.submitBtn}>
          Zaloguj się
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Błędne dane logowania! Spróbuj ponownie</p>}
    </>
  );
};

export default LoginForm;
