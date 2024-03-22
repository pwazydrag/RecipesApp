import classes from "./LoginForm.module.css";
import useInput from "../../hooks/useInput";
import { isLengthValid, isNotEmpty } from "../../utils/formValidators";
import Input from "./Input";

const LoginForm = () => {
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputBlur: handleUsernameBlur,
    hasError: usernameHasError,
  } = useInput("", (value) => isLengthValid(value, 6) && isNotEmpty(value));
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isLengthValid(value, 6));

  const handleFormConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={classes.loginForm} onSubmit={handleFormConfirm}>
      <h2>Logowanie</h2>
      <div>
        <Input
          label="Nazwa"
          id="username"
          type="text"
          name="username"
          onBlur={handleUsernameBlur}
          onChange={handleUsernameChange}
          value={usernameValue}
          error={
            usernameHasError &&
            "Nazwa użytkownika musi mieć przynajmniej 6 znaków!"
          }
        />
        <Input
          label="Hasło"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={
            passwordHasError && "Twoje hasło musi mieć przynajmniej 6 znaków!"
          }
        />
      </div>
      <button type="submit" className={classes.submitBtn}>
        Zaloguj się
      </button>
    </form>
  );
};

export default LoginForm;
