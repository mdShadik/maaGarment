"use client";
import React, { useEffect } from "react";
import styles from "./AddUser.module.scss";
import { CSpinner } from "@coreui/react";
import * as Yup from "yup";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EMAIL_REGEX, pageEndPoints } from "@/utils/constants/appConstants";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Input from "@/components/common/Input";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
import withAuth from "@/hoc/withAuth";
import SelectComponent from "@/components/common/Select";
import { useAppDispatch, useAppSelector } from "@/store";
import { addUsers } from "@/apiRequest/requests/users";
import { getAllGroupForOptions } from "@/store/optionsSlice";

interface AddUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  loginName: string;
  groups: any;
  status: string;
}

const AddUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { groupOptions: info } = useAppSelector((state) => state.option);

  const groupOptions = info?.data?.map((group: any)=> ({
    value: group.id,
    label: group.name
  }))

  const handleSubmit = async (values: AddUserFormValues) => {
    const selectedGroups = values.groups.map((selectedGroup: any) => {
      const fullGroup = info?.data?.find((group: any) => group.id === selectedGroup);      
      return {
        id: selectedGroup,
        name: fullGroup?.name || "",
        shortName: fullGroup?.shortName || "",
      };
    });
  
    const payload = { ...values, groups: selectedGroups };
  
    const response = await addUsers(payload);
    if (response?.status === 201) {
      toast.success("Group Created Successfully");
      router.push(pageEndPoints.users);
    } else {
      toast.error("Error Creating Group");
    }
  };

  const formik = useFormik<AddUserFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      loginName: "",
      groups: [],
      status: 'active'
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      loginName: Yup.string().required("Login Name is required"),
      email: Yup.string()
      .matches(EMAIL_REGEX, "Invalid email format")
      .required("Email is required"),

    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatch(getAllGroupForOptions())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.backBtnContainer}>
        <Button
          className={styles.backBtn}
          onClick={() => {
            router.push(pageEndPoints.users);
          }}
          variant="secondary"
        >
          <IoMdArrowRoundBack /> Back
        </Button>
      </div>
      <h1>Add User</h1>
      <div className={styles.mainContent}>
        <div className={`${styles.content}`}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
              name="firstName"
              type="text"
              placeholder="First Name *"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              inputClassName={styles.input}
            />
            <Input
              name="lastName"
              type="text"
              placeholder="Last Name *"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              inputClassName={styles.input}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email *"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              inputClassName={styles.input}
            />
            <Input
              name="loginName"
              type="text"
              placeholder="User Name *"
              value={formik.values.loginName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.loginName}
              touched={formik.touched.loginName}
              inputClassName={styles.input}
            />
            <SelectComponent
              name="groups"
              options={groupOptions} 
              value={groupOptions?.filter((option: any) =>
                formik.values.groups.includes(option.value) 
              )}
              onChange={(selectedOptions: any) => {
                const selectedIds = selectedOptions.map((option: any) => option.value); 
                formik.setFieldValue("groups", selectedIds);
              }}
              isMulti
              placeholder="Select Group"
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
                "Add User"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AddUser, pageEndPoints.login)

