import React, { useState } from "react";
import styles from "./Pagination.module.scss"
import ReactPaginate from "react-paginate";

interface PageProps {
    total?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
  }

const Pagination: React.FC<PageProps> = ({total, pageSize = 10, onPageChange}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = total ? Math.ceil(total / pageSize) : 0;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    onPageChange?.(selected + 1);
  };


  return (
    <div>
      {total && totalPages > 1 && onPageChange && (
        <div className={styles.paginationWrapper}>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={styles.break}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            disabledClassName={styles.disabled}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
