import { Table, Input, Modal, notification, Form, Button } from "antd";
import { FinishedProductsStyled } from "./style";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FinishedProductsTableData } from "@/mockdata/clients/FinishedProducsts/Products";
import FinishedProductsDrawer from "@/features/clients/components/FinishedProduct/FinishedProductDrawer";
import "@/styles/drawer.css"

export interface FinishedProductData {
  id: number;
  name: string;
  country: string;
  city: string;
  account?: string;
  inn?: string;
  okonh?: string;
  employeeName?: string;
  phones?: string;
  addresses?: string;
  sections: string | string[];
  isResident?: boolean;
}

function FinishedProducts() {
  const [drawerProduct, setDrawerProduct] = useState<FinishedProductData | null | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  console.log(deleteId)

  const [searchForm] = Form.useForm();

  const openCreateDrawer = () => {
    setDrawerProduct(null);
  };

  const openEditDrawer = (record: FinishedProductData) => {
    setDrawerProduct(record);
  };

  const closeDrawer = () => {
    setDrawerProduct(undefined);
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


  const columns: ColumnsType<FinishedProductData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Страна",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Город",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Разделы",
      dataIndex: "sections",
      key: "sections",
      render: (sections) => {
        if (Array.isArray(sections)) {
          return sections.join(', ');
        }
        return sections;
      },
      sorter: (a, b) => {
        const aStr = Array.isArray(a.sections) ? a.sections.join(' ') : a.sections;
        const bStr = Array.isArray(b.sections) ? b.sections.join(' ') : b.sections;
        return aStr.localeCompare(bStr);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditOutlined 
            onClick={() => openEditDrawer(record)} 
            className="sort_render_items" 
          />
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
    <FinishedProductsStyled>
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

        <div className="header_buttons">
          <Button>Заполнение спискам</Button>
          <Button type="primary" onClick={openCreateDrawer}>
            <PlusOutlined /> Добавить новый
          </Button>
        </div>
      </div>

      <FinishedProductsDrawer
        open={drawerProduct !== undefined}
        editingProduct={drawerProduct ?? null}
        onClose={closeDrawer}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={FinishedProductsTableData}
        pagination={{
          total: FinishedProductsTableData.length,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
        }}
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
    </FinishedProductsStyled>
  );
}

export default FinishedProducts;
