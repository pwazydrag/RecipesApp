import classes from "./RegistrationForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { isEmailValid, arePasswordsCorrect } from "../../utils/formValidators";

type FormData = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      className={classes.registrationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Rejestracja</h2>
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
              message: "Nazwa użytkownika nie może mieć więcej niż 20 znaków!",
            },
          })}
          onBlur={() => trigger("username")}
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
          onBlur={() => trigger("email")}
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
          onBlur={() => trigger("password")}
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
          onBlur={() => trigger("repeatPassword")}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
          className={classes.formInput}
        ></TextField>
      </div>
      <button type="submit" className={classes.submitBtn}>
        Zarejestruj się
      </button>
    </form>
  );
};

export default RegistrationForm;
