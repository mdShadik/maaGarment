import React from "react";
import Select from "react-select";
import styles from "./Select.module.scss";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  name: string;
  options: Option[]; 
  value: Option | Option[] | any | string;
  onChange?: any;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string | any;
  touched?: boolean | any;
  isMulti?: boolean; 
  isDisabled?: boolean; 
  className?: string; 
  selectClassName?: string;
  [rest: string]: any;
}

const SelectComponent: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select...",
  error,
  touched,
  isMulti = false,
  isDisabled = false,
  className = "",
  selectClassName = "",
  ...rest
}) => {
  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <Select
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        isDisabled={isDisabled}
        placeholder={placeholder}
        className={`${touched && error ? styles.error : ""} ${styles.SelectControl} ${selectClassName}`}
        {...rest}
      />
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default SelectComponent;
