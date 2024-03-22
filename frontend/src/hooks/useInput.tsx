import { useState, ChangeEvent } from "react";

type ValidationFn = (value: string) => boolean;

type InputState = {
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  hasError: boolean;
};

const useInput = (
  defaultValue: string,
  validationFn: ValidationFn
): InputState => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
};

export default useInput;
