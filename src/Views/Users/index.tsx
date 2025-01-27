"use client";
import React, { useEffect } from "react";
import styles from "./Users.module.scss";
import { CButton } from "@coreui/react";
import Table from "@/components/common/Table";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { getAllUser } from "@/store/userSlice";
import withAuth from "@/hoc/withAuth";

const Users = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector((state) => state.user);
  const { info, loading, error } = usersList;

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row: any) => <span>{`${row.firstName} ${row.lastName}`}</span>,
    },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <span
        className={`${
          row.status === "active"
            ? styles.statusActive
            : styles.statusInActive
        }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const handleRowClick = (rowData: Record<string, any>) => {
    router.push(`${pageEndPoints.viewUser}/${rowData?.id}`)
  };

  useEffect(() => {
    dispatch(getAllUser({}))
  }, [])

  return (
    <div className={styles.container}>
      <h1>User Management Dashboard</h1>
      <div className={styles.mainContent}>
        <div className={`${styles.content}`}>
          <div className={styles.filters}>
            Search
            <button
              className={`${styles["primary-btn"]}`}
                onClick={() =>
                  router.push(pageEndPoints.addUsers)
                }
            >
              Add User
            </button>
          </div>
          <div>
            <Table columns={columns} data={info?.data} loading={loading} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Users, pageEndPoints.login)
