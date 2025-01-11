import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss"


interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>,
    variant?: string,
    className?: string,
    children: ReactNode,
}

const Button: React.FC<ButtonProps> = ({onClick, children, variant, className}) => {
  return (
    <button
      className={`${variant==="primary" ? styles.primaryBtn : styles.secondaryBtn} ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
