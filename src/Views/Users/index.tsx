"use client";
import React from "react";
import styles from "./Users.module.scss";
import { CButton } from "@coreui/react";
import Table from "@/components/common/Table";

const Users = () => {
  const columns = [
    { key: "symbol", label: "Symbol" },
    { key: "buyer", label: "Buyer" },
    { key: "quantity", label: "Quantity" },
    { key: "amount", label: "Amount" },
    { key: "rate", label: "Rate" },
  ];

  return (
    <div className={styles.container}>
      <h1>User Management Dashboard</h1>
      <div className={styles.mainContent}>
        <div className={`${styles.content}`}>
          <div className={styles.filters}>
            Search
            <button
              className={`${styles["primary-btn"]}`}
              //   onClick={() =>
              //     handleSave(floorInfo.length > 5 ? floorInfo.slice(0, 5) : floorInfo, false)
              //   }
            >
              Add User
            </button>
          </div>
          <div>
            <Table columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
