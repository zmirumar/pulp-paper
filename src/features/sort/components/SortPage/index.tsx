import { TableDataSort } from "@/mockdata/sort/TableDataSort"
import { DeleteModalStyled, SortStyled } from "./style"
import { useState } from "react"
import SortDrawer from "../SortDrawer"
import { Table, Input } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

interface SortData {
  id: number;
  name: string;
  sort: string;
  sections: string;
}

function SortPage() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [editData, setEditData] = useState<SortData | null>(null);

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

  const handleOpenCreateDrawer = () => {
    setDrawerMode('create');
    setEditData(null);
    setOpenDrawer(true);
  };

  const handleOpenEditDrawer = (record: SortData) => {
    setDrawerMode('edit');
    setEditData(record);
    setOpenDrawer(true);
  };

  const SortColumns: ColumnsType<SortData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Названия сортов",
      dataIndex: "sort",
      key: "sort",
      sorter: (a, b) => getSortPriority(a.sort) - getSortPriority(b.sort),
    },
    {
      title: "Разделы",
      dataIndex: "sections",
      key: "sections",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditOutlined 
            className="sort_render_items" 
            onClick={() => handleOpenEditDrawer(record)}
          />
          <DeleteOutlined 
            onClick={() => setOpenModal(true)} 
            className="sort_render_items"
          />
        </div>
      ),
    },
  ];

  return (
    <SortStyled>
      <h1>Сорт качество</h1>

      <div className="filter_add">
        <Input
          placeholder="Поиск"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <button className="add_button" onClick={handleOpenCreateDrawer}>
          <PlusOutlined /> Добавит новый
        </button>
      </div>

      <SortDrawer
        showDrawer={openDrawer}
        handleCancelDrawer={() => setOpenDrawer(false)}
        editData={editData}
        mode={drawerMode}
      />

      <Table<SortData>
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
          onShowSizeChange: (size) => {
            setCurrentPage(1);
            setPageSize(size);
          },
        }}
      />

      <DeleteModalStyled
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title="Удалить?"
        children={'Вы уверены, что хотите удалить этот элемент?'}
        footer={[
          <button key="cancel" className="modal-stop" onClick={() => setOpenModal(false)}>
            Отмена
          </button>,
          <button key="submit" className="modal-cont" onClick={() => setOpenModal(false)}>
            Удалить
          </button>,
        ]}
      />
    </SortStyled>
  );
}

export default SortPage;