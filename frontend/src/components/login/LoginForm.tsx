import classes from "./LoginForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
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
              message: "Nazwa użytkownika nie może mieć więcej niż 20 znaków!",
            },
          })}
          onBlur={() => trigger("username")}
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
          onBlur={() => trigger("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          className={classes.formInput}
        ></TextField>
      </div>
      <button type="submit" className={classes.submitBtn}>
        Zaloguj się
      </button>
    </form>
  );
};

export default LoginForm;
