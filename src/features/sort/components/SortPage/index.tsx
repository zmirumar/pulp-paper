import { TableDataSort } from "@/mockdata/sort/TableDataSort"
import { SortStyled } from "./style"
import { useState } from "react"
import SortDrawer from "../SortDrawer"
import { Table, Input, notification,  Modal } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleFilled, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

interface SortData {
  id: number;
  name: string;
  sort: string;
  sections: string;
}

function SortPage() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [editData, setEditData] = useState<SortData | null>(null);
  
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getSortPriority = (sortName: string): number => {
    const lowerSort = sortName.toLowerCase();
    if (lowerSort.includes('высший')) return 0;
    if (lowerSort.includes('средний')) return 1;
    const numMatch = sortName.match(/\d+/);
    return numMatch ? 2 + parseInt(numMatch[0]) : 999;
  };

  const getFilteredData = () => {
    if (!searchText.trim()) return TableDataSort;
    
    const searchLower = searchText.toLowerCase().trim();
    return TableDataSort.filter((item) => {
      const sortMatch = item.sort?.toLowerCase().includes(searchLower);
      const sectionsMatch = item.sections?.toLowerCase().includes(searchLower);
      return sortMatch || sectionsMatch;
    });
  };

  const filteredData = getFilteredData();

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

  const handleOpenDeleteModal = (id: number) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
          notification.success({
        message: 'Сорт удален',
        description: 'Сорт удален из списка',
        icon: <CheckCircleFilled  className='circle_oulined' />,
        className: 'succes_message'
      });
    
    setOpenModal(false);
    setDeleteId(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDeleteId(null);
  };

  const handleTableChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handlePageSizeChange = (_current: number, size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const SortColumns: ColumnsType<SortData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Названия сортов",
      dataIndex: "sort",
      key: "sort",
      sorter: (a, b) => getSortPriority(a.sort) - getSortPriority(b.sort),
      ellipsis: true,
    },
    {
      title: "Разделы",
      dataIndex: "sections",
      key: "sections",
      ellipsis: true,
    },
    {
      key: "action",
      align: 'center',
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditOutlined 
            className="sort_render_items" 
            onClick={() => handleOpenEditDrawer(record)}
            title="Редактировать"
          />
          <DeleteOutlined 
            onClick={() => handleOpenDeleteModal(record.id)} 
            className="sort_render_items"
            title="Удалить"
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
          suffix={<SearchOutlined  className="sort_render_items"  />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
         
        />
        <button className="add_button" onClick={handleOpenCreateDrawer}>
          <PlusOutlined /> Добавить новый
        </button>
      </div>

      <SortDrawer
        showDrawer={openDrawer}
        handleCancelDrawer={handleCloseDrawer}
        editData={editData}
        mode={drawerMode}
      />

      <Table<SortData>
        columns={SortColumns}
        dataSource={filteredData}
        rowKey="id"
        loading={false}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          showSizeChanger: true,  
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onChange: handleTableChange,
          onShowSizeChange: handlePageSizeChange,
        }}
      />

      <Modal
        open={openModal}
        onCancel={handleCloseModal}
        onOk={handleDelete}
        okText="Удалить"
        cancelText="Отменить"
        title="Подтверждение удаления"
        centered
      >
        Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
      </Modal>

      
    </SortStyled>
  );
}

export default SortPage;