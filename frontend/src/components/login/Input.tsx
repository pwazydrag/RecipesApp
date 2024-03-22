import { ChangeEvent } from "react";

import classes from "./Input.module.css";

type InputProps = {
  label: string;
  id: string;
  type: string;
  error: string | boolean;
  name: string;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input = ({
  label,
  id,
  type,
  error,
  name,
  onBlur,
  onChange,
  value,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {label}
        <span className={classes.star}> *</span>
      </label>
      <input
        id={id}
        type={type}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`${error === false ? "" : classes.warningInput}`}
      />
      <div className={classes.warningText}>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
