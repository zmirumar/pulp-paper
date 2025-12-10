import { Tabs, Table, Input, Modal, notification } from "antd";
import { ClientsStyled } from "./style";
import { useState } from "react";
import FinishedProducts from "../FinishedProducts";
import ClientsDrawer from "../ClientsDrawer";
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleFilled, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ClientsTableData } from "@/mockdata/clients/storeage/storeData";

export interface ClientData {
  id: number;
  name: string;
  country: string;
  city: string;
  sections: string;
}

function ClientsPage() {
  const [activeTab, setActiveTab] = useState("1");
  const [searchText, setSearchText] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  const getFilteredData = () => {
    if (!searchText.trim()) return ClientsTableData;
    
    const searchLower = searchText.toLowerCase().trim();
    return ClientsTableData.filter((item) => {
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
    setSelectedClient(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: ClientData) => {
    setDrawerMode('edit');
    setSelectedClient(record);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedClient(null);
  };

  const handleSave = () => {
    if (drawerMode === 'create') {
      notification.success({
        message: 'Клиент создан',
        description: 'Новый клиент успешно добавлен',
        icon: <CheckCircleFilled className='circle_oulined' />,
        className: 'succes_message'
      });
    } else {
      notification.success({
        message: 'Клиент обновлен',
        description: 'Данные клиента успешно обновлены',
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
      message: 'Клиент удален',
      description: 'Клиент удален из списка',
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

  const ClientsColumns: ColumnsType<ClientData> = [
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
    <ClientsStyled>
      <h2>Клиенты</h2>
      <Tabs 
        defaultActiveKey="1" 
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { 
            key: "1", 
            label: "Склад",
            children: (
              <>
                <div className="filter_add">
                  <Input
                    placeholder="Поиск"
                    suffix={<SearchOutlined className="sort_render_items" />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />
                  <button className="add_button" onClick={handleAddNew}>
                    <PlusOutlined /> Добавить новый
                  </button>
                </div>

                <Table<ClientData>
                  columns={ClientsColumns}
                  dataSource={filteredData}
                  rowKey="id"
                  loading={false}
                  pagination={false}
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
                  editData={selectedClient}
                />
              </>
            )
          },
          { 
            key: "2", 
            label: "Готовая продукция",
            children: <FinishedProducts />
          },
        ]}
      />
    </ClientsStyled>
  );
}

export default ClientsPage;