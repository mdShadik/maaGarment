"use client";
import React, { useEffect, useState } from "react";
import styles from "./ViewUser.module.scss";
import {
  CButton,
  CSpinner,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from "@coreui/react";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import { useParams, useRouter } from "next/navigation";
import { EMAIL_REGEX, pageEndPoints } from "@/utils/constants/appConstants";
import Button from "@/components/common/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store";
import { getGroupById } from "@/store/groupSlice";
import { useFormik } from "formik";
import withAuth from "@/hoc/withAuth";
import { getUserById } from "@/store/userSlice";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  loginName: string;
}

const ViewUser = () => {
  const router = useRouter();
  const params = useParams();

  const dispatch = useAppDispatch();
  const { userDetail } = useAppSelector((state) => state.user);

  const { info, error, loading } = userDetail;

  const userData = info?.data;

  const [isEditing, setIsEditing] = useState(false);
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      loginName: userData?.loginName || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      loginName: Yup.string().required("Login Name is required"),
      email: Yup.string()
      .matches(EMAIL_REGEX, "Invalid email format")
      .required("Email is required"),
    }),
    enableReinitialize: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    dispatch(getUserById(params?.id));
  }, [dispatch, params?.id]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteMember = (memberId: string) => {
    console.log("Delete member with ID:", memberId);
  };

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
        {!loading && (
          <div className={styles.saveBthContainer}>
            {isEditing && <Button onClick={() => {
              formik.resetForm();
              handleToggleEdit()
            }}>Cancel</Button>}
            <Button
              className={`${isEditing ? styles.editBtn : styles.saveBth}`}
              onClick={handleToggleEdit}
            >
              {isEditing ? "Save Changes" : "Edit User"}
            </Button>
          </div>
        )}
      </div>
      <h1>User Details</h1>

      <div className={styles.mainContent}>
        {loading ? (
          <div className={styles.spinner}>
            <CSpinner />
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.detailsSection}>
              <Input
                name="name"
                value={formik.values.firstName}
                placeholder="First Name"
                onChange={formik.handleChange}
                readOnly={!isEditing}
              />
              <Input
                name="shortName"
                value={formik.values.lastName}
                placeholder="Last Name"
                onChange={formik.handleChange}
                readOnly={!isEditing}
              />
              <Input
                name="name"
                value={formik.values.loginName}
                placeholder="Login Name"
                onChange={formik.handleChange}
                readOnly={!isEditing}
              />
              <Input
                name="shortName"
                value={formik.values.email}
                placeholder="email"
                onChange={formik.handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className={styles.membersSection}>
              <h2>Groups</h2>
              <CAccordion alwaysOpen>
                {userData?.groups?.map((user: any) => (
                  <CAccordionItem key={user.id}>
                    <CAccordionHeader>
                      <span className={styles.memberHeader}>
                        {`Name: ${user.name}`}
                      </span>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <div className={styles.memberInfo}>
                        <div className={styles.memberBody}>
                          <div>{`Shortname: ${user.shortName}`}</div>
                        </div>
                        {isEditing && (
                          <Button
                            className={styles.removeBtn}
                            onClick={() => handleDeleteMember(user.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                ))}
              </CAccordion>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ViewUser, pageEndPoints.login)

