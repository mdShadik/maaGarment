import React, { MouseEventHandler } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CSpinner } from '@coreui/react';
import styles from "./Card.module.scss"

interface CardProps {
  header: string;
  title: string;
  text: string;
  buttonText: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  loading?: Boolean;
}

const Card: React.FC<CardProps> = ({ header, title, text, buttonText, onClick, loading }) => {
  return (
    <CCard className={styles.cardContainer1}>
      <CCardHeader>{header}</CCardHeader>
      <CCardBody>
        <CCardTitle>{title}</CCardTitle>
        <CCardText>{text}</CCardText>
        <CButton className={styles.cardBtn} onClick={onClick}>
          {loading ? <CSpinner /> : buttonText}
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default Card;
