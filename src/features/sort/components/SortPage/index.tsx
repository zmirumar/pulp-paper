import { TableDataSort } from "@/mockdata/sort/TableDataSort"
import { DeleteModalStyled, SortStyled } from "./style"
import { useState, useMemo, useCallback } from "react"
import SortDrawer from "../SortDrawer"
import { Table, Input, message } from "antd";
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
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [editData, setEditData] = useState<SortData | null>(null);
  
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getSortPriority = useCallback((sortName: string): number => {
    const lowerSort = sortName.toLowerCase();
    if (lowerSort.includes('высший')) return 0;
    if (lowerSort.includes('средний')) return 1;
    const numMatch = sortName.match(/\d+/);
    return numMatch ? 2 + parseInt(numMatch[0]) : 999;
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return TableDataSort;
    
    const searchLower = searchText.toLowerCase().trim();
    return TableDataSort.filter((item) => {
      const sortMatch = item.sort?.toLowerCase().includes(searchLower);
      const sectionsMatch = item.sections?.toLowerCase().includes(searchLower);
      return sortMatch || sectionsMatch;
    });
  }, [searchText]);

  const handleOpenCreateDrawer = useCallback(() => {
    setDrawerMode('create');
    setEditData(null);
    setOpenDrawer(true);
  }, []);

  const handleOpenEditDrawer = useCallback((record: SortData) => {
    setDrawerMode('edit');
    setEditData(record);
    setOpenDrawer(true);
  }, []);

  const handleOpenDeleteModal = useCallback((id: number) => {
    setDeleteId(id);
    setOpenModal(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (!deleteId) return;
    
    try {
      message.success('Элемент успешно удалён');
      setOpenModal(false);
      setDeleteId(null);
      
      const remainingItems = filteredData.length - 1;
      const maxPage = Math.ceil(remainingItems / pageSize);
      if (currentPage > maxPage) {
        setCurrentPage(1);
      }
    } catch (error) {
      message.error('Ошибка при удалении элемента');
      console.error('Delete error:', error);
    }
  }, [deleteId, filteredData.length, pageSize, currentPage]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setDeleteId(null);
  }, []);

  const handleTableChange = useCallback((page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  }, []);

  const handlePageSizeChange = useCallback((_current: number, size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  }, []);

  const SortColumns: ColumnsType<SortData> = useMemo(() => [
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
  ], [getSortPriority, handleOpenEditDrawer, handleOpenDeleteModal]);

  return (
    <SortStyled>
      <h1>Сорт качество</h1>

      <div className="filter_add">
        <Input
          placeholder="Поиск по сорту или разделу"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ maxWidth: 400 }}
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
          showTotal: (total) => `Всего: ${total}`,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onChange: handleTableChange,
          onShowSizeChange: handlePageSizeChange,
        }}
      />

      <DeleteModalStyled
        open={openModal}
        onCancel={handleCloseModal}
        title="Подтверждение удаления"
        footer={[
          <button key="cancel" className="modal_stop" onClick={handleCloseModal}>
            Отмена
          </button>,
          <button key="submit" className="modal_cont" onClick={handleDelete}>
            Удалить
          </button>,
        ]}
      >
        Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
      </DeleteModalStyled>
    </SortStyled>
  );
}

export default SortPage;