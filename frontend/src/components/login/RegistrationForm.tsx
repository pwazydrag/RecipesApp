import classes from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { isEmailValid, arePasswordsCorrect } from "../../utils/formValidators";
import { useState } from "react";
import { postDataNotAuth } from "../../utils/postData";
import { baseUrl } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type FormData = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    mode: "onBlur",
  });
  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const response = await postDataNotAuth(`${baseUrl}/users/register`, data);
    if (response.status === 403) {
      console.log("Taki użytkownik już istnieje!");
      setIsError(true);
    } else if (response.status === 200) {
      console.log("Poprawnie zarejestrowano!");
      setIsError(false);
      login(response.data);
      navigate("/", { replace: true });
    } else {
      console.error(
        "Wystąpił błąd podczas rejestracji! Spróbuj ponownie później"
      );
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <form
        className={`${classes.registrationForm} w-9/12 md:w-6/12 lg:w-4/12 p-11 mt-4 mx-auto`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Rejestracja</h2>
        <div className="flex flex-col gap-12">
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
            label="Adres email"
            type="email"
            {...register("email", {
              required: "Adres email jest wymagany!",
              minLength: {
                value: 8,
                message: "Adres email musi mieć przynajmniej 8 znaków!",
              },
              maxLength: {
                value: 30,
                message: "Adres email nie może mieć więcej niż 30 znaków!",
              },
              validate: (value) =>
                isEmailValid(value) || "Niepoprawny adres email!",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
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
                message: "Hasło nie może mieć więcej niż 20 znaków!",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            className={classes.formInput}
          ></TextField>
          <TextField
            label="Powtórz hasło"
            type="password"
            {...register("repeatPassword", {
              required: "Powtórzenie hasła jest wymagane!",
              validate: (value) =>
                arePasswordsCorrect(value, getValues("password")) ||
                "Hasła nie są takie same!",
            })}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
            className={classes.formInput}
          ></TextField>
        </div>
        <button type="submit" className={classes.submitBtn}>
          Zarejestruj się
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Błędne dane rejestracji! Spróbuj ponownie</p>}
    </>
  );
};

export default RegistrationForm;
