import { TableDataSort } from "@/mockdata/sort/TableDataSort"
import { SortStyled } from "./style"
import { useState } from "react"
import SortDrawer from "../SortDrawer"
import { Table } from "antd";
import Search from "antd/es/transfer/search";
import EditSort from "../EditSort";
import DeleteSort from "../DeleteSort"; 
import {  PlusOutlined } from "@ant-design/icons";


function SortPage() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const getSortPriority = (sortName: string): number => {
    const lowerSort = sortName.toLowerCase();
    if (lowerSort.includes('высший')) return 0;
    if (lowerSort.includes('средний')) return 1;
    const numMatch = sortName.match(/\d+/);
    return numMatch ? 2 + parseInt(numMatch[0]) : 999;
  };

  const filteredData = TableDataSort.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const sortMatch = item.sort?.toLowerCase().includes(searchLower);
    const sectionsMatch = item.sections?.toLowerCase().includes(searchLower);
    return sortMatch || sectionsMatch;
  });

  const SortColumns = [
    {
      title: "Наименование",
      dataIndex: "name",
    },
    {
      title: "Названия сортов",
      dataIndex: "sort",
      sorter: (a: { sort: string; }, b: { sort: string; } ) => getSortPriority(a.sort) - getSortPriority(b.sort),
    },
    {
      title: "Разделы",
      dataIndex: "sections",
    },
    {
      title: "",
      render: (_: unknown, record: unknown) => (
        <div className="sort_columns_render">
          <EditSort record={record} />
          <DeleteSort/>
        </div>
      ),
    },
  ];

  return (
    <SortStyled>
      <h1>Сорт качество</h1>

      <div className="filter_add">
        <Search
          placeholder="Поиск по сортам и разделам"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="add_button" onClick={() => setOpenDrawer(true)}><PlusOutlined/> Добавит новый</button>
      </div>
      <SortDrawer
        showDrawer={openDrawer}  
        handleCancelDrawer={() => setOpenDrawer(false)}
      />

      <Table 
        columns={SortColumns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          onShowSizeChange: ( size) => {
            setCurrentPage(1);
            setPageSize(size);
          },
        }}
      />
    </SortStyled>
  );
}

export default SortPage;