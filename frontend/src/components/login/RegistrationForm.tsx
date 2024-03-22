import classes from "./RegistrationForm.module.css";
import useInput from "../../hooks/useInput";
import {
  isLengthValid,
  isEmailValid,
  arePasswordsCorrect,
  isNotEmpty,
} from "../../utils/formValidators";
import Input from "./Input";

const RegistrationForm = () => {
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputBlur: handleUsernameBlur,
    hasError: usernameHasError,
  } = useInput("", (value) => isLengthValid(value, 6) && isNotEmpty(value));
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmailValid(value) && isNotEmpty(value));
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isLengthValid(value, 6));
  const {
    value: repeatPasswordValue,
    handleInputChange: handleRepeatPasswordChange,
    handleInputBlur: handleRepeatPasswordBlur,
    hasError: repeatPasswordHasError,
  } = useInput("", (value) => arePasswordsCorrect(value, passwordValue));

  const handleFormConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={classes.registrationForm} onSubmit={handleFormConfirm}>
      <h2>Rejestracja</h2>
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
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Wpisz poprawny adres email!"}
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
        <Input
          label="Powtórz hasło"
          id="repeatPassword"
          type="password"
          name="repeatPassword"
          onChange={handleRepeatPasswordChange}
          onBlur={handleRepeatPasswordBlur}
          value={repeatPasswordValue}
          error={repeatPasswordHasError && "Twoje hasła nie są takie same!"}
        />
      </div>
      <button type="submit" className={classes.submitBtn}>
        Zarejestruj się
      </button>
    </form>
  );
};

export default RegistrationForm;
