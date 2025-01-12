import React from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import styles from "./Table.module.scss";

interface TableColumn {
  key: string;
  label: string;
  render?: (rowData: Record<string, any>) => React.ReactNode; // Add render property
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  loading?: boolean;
  onRowClick?: (rowData: Record<string, any>) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, loading, onRowClick }) => {
  return (
    <CTable hover striped bordered responsive className={styles.table}>
      <CTableHead className={styles.tableHeader}>
        <CTableRow>
          {columns.map((column) => (
            <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {loading ? (
          Array.from({ length: 10 }).map((_, rowIndex) => (
            <CTableRow key={rowIndex} className={styles.loadingRow}>
              {columns.map((column) => (
                <CTableDataCell key={column.key}>
                  <div className={styles.loadingSkeleton}></div>
                </CTableDataCell>
              ))}
            </CTableRow>
          ))
        ) : data?.length > 0 ? (
          data.map((row, rowIndex) => (
            <CTableRow
              key={rowIndex}
              className={styles.clickableRow}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <CTableDataCell key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan={columns.length} className="text-center">
              No data available
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  );
};

export default Table;
