"use client";
import React from "react";
import styles from "./AddUserGroups.module.scss";
import { CButton, CSpinner } from "@coreui/react";
import * as Yup from "yup";
import Table from "@/components/common/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { addGroups } from "@/apiRequest/requests/groups";
import Input from "@/components/common/Input";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
import withAuth from "@/hoc/withAuth";

interface AddGroupFormValues {
  name: string;
  shortname: string;
}

const AddUserGroups = () => {
  const router = useRouter();

  const handleSubmit = async (values: AddGroupFormValues) => {
    const response = await addGroups(values.name, values.shortname);
    if (response?.status === 201) {
      toast.success("Group Created Successfully");
      router.push(pageEndPoints.groups);
    } else {
      toast.error("Error Creating Group");
    }
  };

  const formik = useFormik<AddGroupFormValues>({
    initialValues: {
      name: "",
      shortname: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      shortname: Yup.string().required("Short Name is required"),
    }),
    onSubmit: handleSubmit,
  });

  const columns = [
    { key: "symbol", label: "Symbol" },
    { key: "buyer", label: "Buyer" },
    { key: "quantity", label: "Quantity" },
    { key: "amount", label: "Amount" },
    { key: "rate", label: "Rate" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.backBtnContainer}>
        <Button
          className={styles.backBtn}
          onClick={() => {
            router.push(pageEndPoints.groups);
          }}
          variant="secondary"
        >
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>
      <h1>Add Group</h1>
      <div className={styles.mainContent}>
        <div className={`${styles.content}`}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
              name="name"
              type="text"
              placeholder="Name *"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
              inputClassName={styles.input}
            />
            <Input
              name="shortname"
              type="text"
              placeholder="Short Name *"
              value={formik.values.shortname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.shortname}
              touched={formik.touched.shortname}
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
                  <CSpinner size="sm" />
                </div>
              ) : (
                "Add Group"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AddUserGroups, pageEndPoints.login)

