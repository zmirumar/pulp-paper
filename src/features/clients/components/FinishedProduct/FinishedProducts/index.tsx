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
import FinishedProductsDrawer from "../FinishedProductDrawer";

export interface FinishedProductData {
  id: number;
  name: string;
  country: string;
  city: string;
  sections: string;
}

function FinishedProducts() {
  const [drawerProduct, setDrawerProduct] =
    useState<FinishedProductData | null | undefined>(undefined);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [searchForm] = Form.useForm();
  const searchValue = Form.useWatch("search", searchForm);

  const handleDelete = () => {
    notification.success({
      message: "Продукт удален",
      icon: <CheckCircleFilled />,
      placement: "topRight",
    });
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const filteredData = FinishedProductsTableData.filter((item) => {
    const search = searchValue?.toLowerCase() || "";
    return (
      item.name.toLowerCase().includes(search) ||
      item.country.toLowerCase().includes(search) ||
      item.city.toLowerCase().includes(search) ||
      item.sections.toLowerCase().includes(search)
    );
  });

  const columns: ColumnsType<FinishedProductData> = [
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
          <EditOutlined onClick={() => setDrawerProduct(record)} />
          <DeleteOutlined
            onClick={() => {
              setDeleteId(record.id);
              setShowDeleteModal(true);
            }}
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
          <Button type="primary" onClick={() => setDrawerProduct(null)}>
            <PlusOutlined /> Добавить новый
          </Button>
        </div>
      </div>

      <FinishedProductsDrawer
        open={drawerProduct !== undefined}
        editingProduct={drawerProduct ?? null}
        onClose={() => setDrawerProduct(undefined)}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        pagination={{
          total: filteredData.length,
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
        onOk={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      >
        Вы уверены, что хотите удалить этот элемент?
      </Modal>
    </FinishedProductsStyled>
  );
}

export default FinishedProducts;
