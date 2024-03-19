import { useRef, useState } from "react";

import classes from "./LoginForm.module.css";
import FormGroup from "./FormGroup";
import { isLengthValid } from "../../utils/formValidators";

const RegistrationForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [formValidators, setFormValidators] = useState({
    isUsernameValid: true,
    isPasswordValid: true,
  });

  const handleFormConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current?.value || "";
    const enteredPassword = passwordRef.current?.value || "";

    const isEnteredUsernameValid = isLengthValid(enteredUsername, 6);
    const isEnteredPasswordValid = isLengthValid(enteredPassword, 6);

    setFormValidators({
      isUsernameValid: isEnteredUsernameValid,
      isPasswordValid: isEnteredPasswordValid,
    });

    const formIsValid = isEnteredUsernameValid && isEnteredPasswordValid;

    formIsValid &&
      console.log(
        "Logowanie przebiegło pomyślnie!",
        enteredUsername,
        enteredPassword
      );
  };

  return (
    <form className={classes.registrationForm} onSubmit={handleFormConfirm}>
      <h2>Logowanie</h2>
      <FormGroup
        id="username"
        labelText="Nazwa użytkownika"
        inputType="text"
        inputPlaceholder="Nazwa użytkownika"
        inputRef={usernameRef}
        isValid={formValidators.isUsernameValid}
        errorMessage="Niepoprawna nazwa użytkownika!"
      ></FormGroup>
      <FormGroup
        id="password"
        labelText="Hasło"
        inputType="password"
        inputPlaceholder="Hasło"
        inputRef={passwordRef}
        isValid={formValidators.isPasswordValid}
        errorMessage="Niepoprawne hasło!"
      ></FormGroup>
      <button type="submit" className={classes.submitBtn}>
        Zaloguj się
      </button>
    </form>
  );
};

export default RegistrationForm;
