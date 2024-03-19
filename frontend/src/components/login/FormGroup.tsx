import classes from "./FormGroup.module.css";

type RegistrationFormGroupProps = {
  id: string;
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isValid: boolean;
  errorMessage: string;
};

const RegistrationFormGroup = ({
  id,
  labelText,
  inputType,
  inputPlaceholder,
  inputRef,
  isValid,
  errorMessage,
}: RegistrationFormGroupProps) => {
  return (
    <div className={classes.formGroup}>
      <label htmlFor={id}>
        {labelText} <span className={classes.star}> *</span>
      </label>
      <input
        id={id}
        ref={inputRef}
        type={inputType}
        placeholder={inputPlaceholder}
        required
        className={`${isValid ? "" : classes.warningInput}`}
      />
      {!isValid && <p className={classes.warningText}>{errorMessage}</p>}
    </div>
  );
};

export default RegistrationFormGroup;
