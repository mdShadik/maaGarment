"use client";

import Image from "next/image";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import { CSpinner } from "@coreui/react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser } from "@/apiRequest/requests/login";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { setAuthState } from "@/store/authSlice";
import withAuthRedirect from "@/hoc/withAuthRedirects";
import styles from "./Login.module.scss";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, userId } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await loginUser(values.email, values.password);
    const { userId, token, success } = response;
    if (success) {
      toast.success("Successfully Logged in");
      dispatch(
        setAuthState({
          isAuthenticated: true,
          userId: userId,
          token: token,
        })
      );
      router.push(pageEndPoints.dashboard);
      window.location.reload();
    } else {
      toast.error(response?.message);
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Login Name is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoWrapper}>
          <Image src="/vercel.svg" alt="logo" width={200} height={200} />
        </div>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <Input
            name="email"
            type="text"
            placeholder="Login Name *"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            inputClassName={styles.input}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password *"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            inputClassName={styles.input}
          />
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`${styles.button} ${
              formik.isSubmitting ? styles.disabledButton : ""
            }`}
          >
            {formik.isSubmitting ? (
              <div className={styles.loadingWrapper}>
                Logging in... <CSpinner size="sm" />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuthRedirect(Login, pageEndPoints.dashboard);
