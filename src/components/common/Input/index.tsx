import React from "react";
import { CFormInput } from "@coreui/react";
import styles from "./Input.module.scss";

interface InputProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
  readOnly?: boolean; // New prop for read-only mode
  className?: string;
  inputClassName?: string;
  [rest: string]: any;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  readOnly = false,
  className = "",
  inputClassName = "",
  ...rest
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {readOnly && <label htmlFor={name}> {placeholder} </label>}
      <CFormInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={`${readOnly ? styles.readOnlyMode : styles.input} ${touched && error ? styles.error : ""} ${inputClassName}`}
        {...rest}
      />
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
