"use client";
import React, { useEffect } from "react";
import styles from "./UserGroups.module.scss";
import { CButton } from "@coreui/react";
import Table from "@/components/common/Table";
import { useRouter } from "next/navigation";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGroup } from "@/store/groupSlice";

const UserGroups = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { group } = useAppSelector((state) => state.group);
  const { info, loading, error } = group;

  const columns = [
    { key: "name", label: "Name" },
    { key: "shortName", label: "Short Name" },
  ];

  const handleRowClick = (rowData: Record<string, any>) => {
    router.push(`${pageEndPoints.viewGroups}/${rowData?.id}`)
  };

  useEffect(() => {
    dispatch(getAllGroup({}))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Group Management Dashboard</h1>
      <div className={styles.mainContent}>
        <div className={`${styles.content}`}>
          <div className={styles.filters}>
            Search
            <button
              className={`${styles["primary-btn"]}`}
              onClick={() =>{
                router.push(`${pageEndPoints.addGroups}`)
              }}
            >
              Add User Group
            </button>
          </div>
          <div>
            <Table columns={columns} data={info?.data} onRowClick={handleRowClick} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
