import { TableDataSort } from "@/mockdata/sort/TableDataSort"
import { SortStyled } from "./style"
import { useState } from "react"
import SortDrawer from "../SortDrawer"
import { Pagination, Table } from "antd"
import Search from "antd/es/transfer/search"
import EditSort from "../EditSort"
import DeleteSort from "../DeleteSort"

function SortPage() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

   const SortColumns = [
    {
      title: "Наименование",
      dataIndex: "name",
    },
    {
      title: "Названия сортов",
      dataIndex: "sort",
      sorter: (a, b) => a.sort.localeCompare(b.sort),
    },
    {
      title: "Разделы",
      dataIndex: "sections",
    },
    {
      title: "",
      render: (record: any) => (
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
 

      <Search 
      />

      <Table 
       columns={SortColumns}
        dataSource={TableDataSort}
      />
      <Pagination/>


      <SortDrawer
        showDrawer={openDrawer}  
        handleCancelDrawer={() => setOpenDrawer(false)}
      />
    </SortStyled>
  );
}

export default SortPage;