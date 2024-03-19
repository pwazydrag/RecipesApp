import { useRef, useState } from "react";

import classes from "./RegistrationForm.module.css";
import RegistrationFormGroup from "./FormGroup";
import {
  isLengthValid,
  isEmailValid,
  arePasswordsCorrect,
} from "../../utils/formValidators";

const RegistrationForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const [formValidators, setFormValidators] = useState({
    isUsernameValid: true,
    isTypedEmailValid: true,
    isPasswordValid: true,
    isRepeatPasswordValid: true,
  });

  const handleFormConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current?.value || "";
    const enteredEmail = emailRef.current?.value || "";
    const enteredPassword = passwordRef.current?.value || "";
    const enteredRepeatPassword = repeatPasswordRef.current?.value || "";

    const isEnteredUsernameValid = isLengthValid(enteredUsername, 6);
    const isEnteredEmailValid = isEmailValid(enteredEmail);
    const isEnteredPasswordValid = isLengthValid(enteredPassword, 6);
    const isEnteredRepeatPasswordValid = arePasswordsCorrect(
      enteredPassword,
      enteredRepeatPassword
    );

    setFormValidators({
      isUsernameValid: isEnteredUsernameValid,
      isTypedEmailValid: isEnteredEmailValid,
      isPasswordValid: isEnteredPasswordValid,
      isRepeatPasswordValid: isEnteredRepeatPasswordValid,
    });

    const formIsValid =
      isEnteredUsernameValid &&
      isEnteredEmailValid &&
      isEnteredPasswordValid &&
      isEnteredRepeatPasswordValid;

    formIsValid &&
      console.log(
        "Rejestracja przebiegła pomyślnie!",
        enteredUsername,
        enteredEmail,
        enteredPassword,
        enteredRepeatPassword
      );
  };

  return (
    <form className={classes.registrationForm} onSubmit={handleFormConfirm}>
      <h2>Rejestracja</h2>
      <RegistrationFormGroup
        id="username"
        labelText="Nazwa użytkownika"
        inputType="text"
        inputPlaceholder="Nazwa użytkownika"
        inputRef={usernameRef}
        isValid={formValidators.isUsernameValid}
        errorMessage="Nazwa użytkownika musi mieć przynajmniej 6 znaków!"
      ></RegistrationFormGroup>
      <RegistrationFormGroup
        id="email"
        labelText="Email"
        inputType="text"
        inputPlaceholder="Adres email"
        inputRef={emailRef}
        isValid={formValidators.isTypedEmailValid}
        errorMessage="Niepoprawny adres email!"
      ></RegistrationFormGroup>
      <RegistrationFormGroup
        id="password"
        labelText="Hasło"
        inputType="password"
        inputPlaceholder="Hasło"
        inputRef={passwordRef}
        isValid={formValidators.isPasswordValid}
        errorMessage="Hasło musi mieć przynajmniej 6 znaków!"
      ></RegistrationFormGroup>
      <RegistrationFormGroup
        id="repeatPassword"
        labelText="Powtórz hasło"
        inputType="password"
        inputPlaceholder="Powtórz hasło"
        inputRef={repeatPasswordRef}
        isValid={formValidators.isRepeatPasswordValid}
        errorMessage="Hasła nie są takie same!"
      ></RegistrationFormGroup>
      <button type="submit" className={classes.submitBtn}>
        Zarejestruj się
      </button>
    </form>
  );
};

export default RegistrationForm;
