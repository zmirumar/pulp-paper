import { Tabs, Table, Input, Modal, notification, Form, Button } from "antd";
import { ClientsStyled } from "./style";
import { useState } from "react";
import FinishedProducts from "../../FinishedProduct/FinishedProducts";
import ClientsDrawer from "../ClientsDrawer";
import type { ColumnsType } from "antd/es/table";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ClientsTableData } from "@/mockdata/clients/storeage/storeData";

export interface ClientData {
  id: number;
  name: string;
  country: string;
  city: string;
  sections: string;
}

function ClientsPage() {
  const [activeTab, setActiveTab] = useState<string>("1");

  const [drawerClient, setDrawerClient] = useState<ClientData | null | undefined>(
    undefined
  );

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [searchForm] = Form.useForm();
  const searchValue = Form.useWatch("search", searchForm);

  const openCreateDrawer = () => {
    setDrawerClient(null);
  };

  const openEditDrawer = (record: ClientData) => {
    setDrawerClient(record); 
  };

  const closeDrawer = () => {
    setDrawerClient(undefined); 
  };

  const handleDelete = () => {
    notification.success({
      message: "Продукт удален",
      description: "Продукт удалён из списка",
      icon: <CheckCircleFilled className="circle_oulined" />,
      className: "succes_message",
      placement: "topRight",
    });
    setShowDeleteModal(false);
    setDeleteId(null);
  };
  const filteredData = ClientsTableData.filter((item) => {
    const search = searchValue?.toLowerCase() || "";
    return (
      item.name.toLowerCase().includes(search) ||
      item.country.toLowerCase().includes(search) ||
      item.city.toLowerCase().includes(search) ||
      item.sections.toLowerCase().includes(search)
    );
  });

  const columns: ColumnsType<ClientData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Страна",
      dataIndex: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Город",
      dataIndex: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "Разделы",
      dataIndex: "sections",
      sorter: (a, b) => a.sections.localeCompare(b.sections),
    },
    {
      align: "center",
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditOutlined onClick={() => openEditDrawer(record)} className="sort_render_items"  />
          <DeleteOutlined
            onClick={() => {
              setDeleteId(record.id);
              setShowDeleteModal(true);
            }}
            className="sort_render_items" 
          />
        </div>
      ),
    },
  ];

  return (
    <ClientsStyled>
      <h2>Клиенты</h2>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "1",
            label: "Склад",
            children: (
              <>
                <div className="filter_add">
                  <Form form={searchForm}>
                    <Form.Item name="search" noStyle>
                      <Input
                        placeholder="Поиск"
                        suffix={<SearchOutlined />}
                        allowClear
                      />
                    </Form.Item>
                  </Form>

                  <Button type="primary" onClick={openCreateDrawer}>
                    <PlusOutlined /> Добавить новый
                  </Button>
                </div>

                <ClientsDrawer
                  open={drawerClient !== undefined}
                  editingClient={drawerClient ?? null}
                  onClose={closeDrawer}
                />

                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={filteredData}
                  pagination={{ pageSize: 10 }}
                />

                <Modal
                  open={showDeleteModal}
                  title="Подтверждение удаления"
                  okText="Удалить"
                  cancelText="Отменить"
                  centered
                  width={400}
                  onOk={handleDelete}
                  onCancel={() => setShowDeleteModal(false)}
                >
                  Вы уверены, что хотите удалить этот элемент?
                </Modal>
              </>
            ),
          },
          {
            key: "2",
            label: "Готовая продукция",
            children: <FinishedProducts />,
          },
        ]}
      />
    </ClientsStyled>
  );
}

export default ClientsPage;
