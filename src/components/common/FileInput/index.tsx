import React from "react";
import { CFormInput } from "@coreui/react";
import styles from "./FileInput.module.scss";

interface FileInputProps {
  name: string;
  placeholder?: string;
  accept?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
  className?: string;
  inputClassName?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  [rest: string]: any;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  placeholder = "Choose file",
  label,
  accept,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
  inputClassName = "",
  multiple = false,
  disabled = false,
  ...rest
}) => {
  return (
    <div className={`${styles.fileInputContainer} ${className}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <CFormInput
        type="file"
        name={name}
        id={name}
        accept={accept}
        onChange={onChange}
        onBlur={onBlur}
        multiple={multiple}
        disabled={disabled}
        className={`${styles.fileInput} ${touched && error ? styles.error : ""} ${inputClassName}`}
        {...rest}
      />
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default FileInput;
