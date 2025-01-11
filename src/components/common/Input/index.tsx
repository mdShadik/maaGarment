import React from "react";
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
  className = "",
  inputClassName = "",
  ...rest
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${touched && error ? styles.error : ""} ${inputClassName}`}
        {...rest}
      />
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
