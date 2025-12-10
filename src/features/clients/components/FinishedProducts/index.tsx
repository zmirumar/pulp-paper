import { Table, Input, Modal, notification } from "antd";
import { FinishedProductsStyled } from "./style";
import { useState } from "react";
import ClientsDrawer from "../ClientsDrawer";
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleFilled, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FinishedProductsTableData } from "@/mockdata/clients/FinishedProducsts/Products";

export interface FinishedProductData {
  id: number;
  name: string;
  country: string;
  city: string;
  sections: string;
}



function FinishedProducts() {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<FinishedProductData | null>(null);

  const getFilteredData = () => {
    if (!searchText.trim()) return FinishedProductsTableData;
    
    const searchLower = searchText.toLowerCase().trim();
    return FinishedProductsTableData.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(searchLower);
      const countryMatch = item.country?.toLowerCase().includes(searchLower);
      const cityMatch = item.city?.toLowerCase().includes(searchLower);
      const sectionsMatch = item.sections?.toLowerCase().includes(searchLower);
      return nameMatch || countryMatch || cityMatch || sectionsMatch;
    });
  };

  const filteredData = getFilteredData();

  const handleAddNew = () => {
    setDrawerMode('create');
    setSelectedProduct(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: FinishedProductData) => {
    setDrawerMode('edit');
    setSelectedProduct(record);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedProduct(null);
  };

  const handleSave = () => {
    if (drawerMode === 'create') {
      notification.success({
        message: 'Продукт создан',
        description: 'Новый продукт успешно добавлен',
        icon: <CheckCircleFilled className='circle_oulined' />,
        className: 'succes_message'
      });
    } else {
      notification.success({
        message: 'Продукт обновлен',
        description: 'Данные продукта успешно обновлены',
        icon: <CheckCircleFilled className='circle_oulined' />,
        className: 'succes_message'
      });
    }
    
    handleCloseDrawer();
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    notification.success({
      message: 'Продукт удален',
      description: 'Продукт удален из списка',
      icon: <CheckCircleFilled className='circle_oulined' />,
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

  const columns: ColumnsType<FinishedProductData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
    },
    {
      title: "Страна",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
      ellipsis: true,
    },
    {
      title: "Город",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      ellipsis: true,
    },
    {
      title: "Разделы",
      dataIndex: "sections",
      key: "sections",
      sorter: (a, b) => a.sections.localeCompare(b.sections),
      ellipsis: true,
    },
    {
      key: "action",
      align: 'center',
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditOutlined 
            className="sort_render_items" 
            onClick={() => handleEdit(record)}
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
    <FinishedProductsStyled>
      <div className="filter_add">
        <Input
          placeholder="Поиск"
          suffix={<SearchOutlined className="sort_render_items" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <div className="header_buttons">
          <button className="add_list">Заполнение спискам</button>
          <button className="add_button" onClick={handleAddNew}>
            <PlusOutlined /> Добавить новый
          </button>
        </div>
      </div>

      <Table<FinishedProductData>
        columns={columns}
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
      >
        Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
      </Modal>

      <ClientsDrawer
        open={drawerVisible}
        onClose={handleCloseDrawer}
        onCancel={handleCloseDrawer}
        onConfirm={handleSave}
        mode={drawerMode}
        editData={selectedProduct}
      />
    </FinishedProductsStyled>
  );
}

export default FinishedProducts;