"use client";
import React, { useEffect, useState } from "react";
import styles from "./ViewGroup.module.scss";
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
import { pageEndPoints } from "@/utils/constants/appConstants";
import Button from "@/components/common/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store";
import { getGroupById } from "@/store/groupSlice";
import { useFormik } from "formik";

interface FormValues {
  name: string;
  shortName: string;
}

const ViewGroup = () => {
  const router = useRouter();
  const params = useParams();

  const dispatch = useAppDispatch();
  const { groupInfo } = useAppSelector((state) => state.group);

  const { info, error, loading } = groupInfo;

  const groupData = info?.data;

  const [isEditing, setIsEditing] = useState(false);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: groupData?.name || "",
      shortName: groupData?.shortName || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      shortName: Yup.string().required("Short Name is required"),
    }),
    enableReinitialize: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    dispatch(getGroupById(params?.id));
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
              {isEditing ? "Save Changes" : "Edit Group"}
            </Button>
          </div>
        )}
      </div>
      <h1>Group Details</h1>

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
                value={formik.values.name}
                placeholder="Group Name"
                onChange={formik.handleChange}
                readOnly={!isEditing}
              />
              <Input
                name="shortName"
                value={formik.values.shortName}
                placeholder="Short Name"
                onChange={formik.handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className={styles.membersSection}>
              <h2>Members</h2>
              <CAccordion alwaysOpen>
                {groupData?.users?.map((user: any) => (
                  <CAccordionItem key={user.id}>
                    <CAccordionHeader>
                      <span className={styles.memberHeader}>
                        {`${user.firstName} ${user.lastName}`}
                      </span>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <div className={styles.memberInfo}>
                        <div className={styles.memberBody}>
                          <div>{user.email}</div>
                          <div>
                            Status:
                            <span
                              className={`${
                                user.status === "active"
                                  ? styles.statusActive
                                  : styles.statusInActive
                              }`}
                            >
                              {user.status}
                            </span>
                          </div>
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

export default ViewGroup;
