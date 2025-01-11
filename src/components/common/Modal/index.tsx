import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

interface CommonModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string,
  footerButtons?: {
    text: string;
    onClick: () => void;
    color?: string; 
    className?: string;
  }[];
}

const Modal: React.FC<CommonModalProps> = ({
  visible,
  onClose,
  title,
  children,
  footerButtons,
  className,
}) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static" alignment="center"
    scrollable  className={className}>
      {title && <CModalHeader>{title}</CModalHeader>}
      <CModalBody>{children}</CModalBody>
      {footerButtons && (
        <CModalFooter>
          {footerButtons.map((button, index) => (
            <CButton
              key={index}
            //   color={button.color || 'primary'}
              onClick={button.onClick}
              className={button.className}
            >
              {button.text}
            </CButton>
          ))}
        </CModalFooter>
      )}
    </CModal>
  );
};

export default Modal;
