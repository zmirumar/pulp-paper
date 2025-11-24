import { TableDataSort } from "@/mockdata/sort/TableDataSort"
import { SortStyled } from "./style"
import { useState } from "react"
import SortSearch from "../SortSearch"
import SortTable from "../SortTable"
import SortPagination from "../SortPagination"
import SortDrawer from "../SortDrawer"

function SortPage() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredTotal, setFilteredTotal] = useState<number>(TableDataSort.length);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <SortStyled>
      <h1>Сорт качество</h1>
 

      <SortSearch 
        onSearch={setSearchText}
        onAddClick={() => setOpenDrawer(true)}
      />

      <SortTable 
        data={TableDataSort}
        searchText={searchText}
        currentPage={currentPage}
        pageSize={pageSize}
        onDataFiltered={setFilteredTotal}
      />

      <SortPagination
        total={filteredTotal}
        resetTrigger={searchText}
        onPaginationChange={handlePaginationChange}
      />

      <SortDrawer
        showDrawer={openDrawer}  
        handleCancelDrawer={() => setOpenDrawer(false)}
      />
    </SortStyled>
  );
}

export default SortPage;