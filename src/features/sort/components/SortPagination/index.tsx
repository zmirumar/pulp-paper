/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "antd"
import { useState, useEffect } from "react"

interface SortPaginationProps {
  total: number;
  resetTrigger?: any;
  onPaginationChange: (page: number, pageSize: number) => void; 
}

function SortPagination({ total, resetTrigger, onPaginationChange }: SortPaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setCurrentPage(1);
    onPaginationChange(1, pageSize); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTrigger]);

  const handlePaginationChange = (page: number, newPageSize: number) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
    onPaginationChange(page, newPageSize); 
  };

  return (
    <Pagination
      showSizeChanger
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={handlePaginationChange}
      className="sort_pagination"
      pageSizeOptions={['5', '10', '20', '50']}
    />
  );
}

export default SortPagination;