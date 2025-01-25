// src/components/LoadingOverlay.tsx
"use client";

import React from "react";
import { CSpinner, CBackdrop } from "@coreui/react";
import { useAppSelector } from "@/store";

const LoadingOverlay: React.FC = () => {
  const isLoading = useAppSelector(state => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <CBackdrop className="d-flex justify-content-center align-items-center" visible>
      <CSpinner color="primary" style={{ width: "3rem", height: "3rem" }} />
    </CBackdrop>
  );
};

export default LoadingOverlay;
