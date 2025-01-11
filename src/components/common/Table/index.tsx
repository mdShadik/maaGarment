import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Table.module.scss";

interface TableColumn {
  key: string;
  label: string;
  render?: Function;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  loading: Boolean | null;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading,
}) => {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={styles.tableHeaderCell}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key} className={styles.tableCell}>
                      <div className={styles.loadingSkeleton}></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data?.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={styles.tableCell}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noDataCell}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
