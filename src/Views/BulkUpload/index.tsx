"use client";
import React from "react";
import styles from "./BulkUpload.module.scss";
import { CSpinner } from "@coreui/react";
import * as Yup from "yup";
import { IoMdArrowRoundBack } from "react-icons/io";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
import withAuth from "@/hoc/withAuth";
import SelectComponent from "@/components/common/Select";
import { useAppDispatch } from "@/store";
import { addUsers } from "@/apiRequest/requests/users";
import FileInput from "@/components/common/FileInput";
import { importUpload } from "@/apiRequest/requests/import";

const fileTypeOpt = [
  { value: "USER", label: "User" },
  { value: "PRODUCT", label: "Product" },
];

interface BulkUploadFormValues {
  fileType: string;
  file: File | null;
}

const BulkUpload = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: BulkUploadFormValues) => {
    const payload = { ...values };

    const response = await importUpload(payload);
    if (response?.status === 201) {
      toast.success("File Uploaded Successfully");
      router.push(pageEndPoints.users);
    } else {
      toast.error("Error Uploading Files");
    }
  };

  const formik = useFormik<BulkUploadFormValues>({
    initialValues: {
      fileType: "",
      file: null,
    },
    validationSchema: Yup.object({
      fileType: Yup.string().required("File type is required"),
      file: Yup.mixed()
        .nullable()
        .required("File is required")
        .test("fileType", "Only CSV or Excel files are allowed", (value: any) =>
          value ? ["text/csv", "application/vnd.ms-excel"].includes(value?.type) : false
        ),
    }),
    onSubmit: handleSubmit,
  });

  console.log(formik.values)

  return (
    <div className={styles.container}>
      <h1>Bulk Upload</h1>
      <div className={styles.mainContent}>
        <div className={`${styles.content}`}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <SelectComponent
              name="fileType"
              options={fileTypeOpt}
              value={fileTypeOpt.find((option) => option.value === formik.values.fileType)}
              onChange={(selectedOption: any) => {
                formik.setFieldValue("fileType", selectedOption.value);
              }}
              placeholder="Select File Type"
            />
            <div>
              <FileInput
                name="file"
                placeholder="Upload your file"
                accept=".csv, .xlsx"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  formik.setFieldValue("file", file);
                }}
                error={formik.touched.file && formik.errors.file ? formik.errors.file : ""}
                touched={formik.touched.file}
                disabled={!formik.values.fileType}
              />
              {/* {formik.values.file && <p>Selected File: {formik.values.file.name}</p>} */}
            </div>

            {/* Submit Button */}
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
                "Upload File"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(BulkUpload, pageEndPoints.login);
