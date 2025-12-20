import { TableDataSort } from "@/mockdata/sort/TableDataSort";
import "@/styles/drawer.css"
import { SortStyled } from "./style";
import { useState } from "react";
import SortDrawer from "../SortDrawer";
import { Table, Input, notification, Modal, Form, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface SortData {
  id: number;
  name: string;
  sort: string;
  sections: string;
}

function SortPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingSort, setEditingSort] = useState<SortData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [searchForm] = Form.useForm();
  const searchValue = Form.useWatch("search", searchForm);

  const handleOpenCreateDrawer = () => {
    setEditingSort(null); 
    setOpenDrawer(true);
  };

  const handleOpenEditDrawer = (record: SortData) => {
    setEditingSort(record); 
    setOpenDrawer(true);
  };

  const handleDelete = () => {
    notification.success({
      message: "Сорт удален",
      description: "Сорт удалён из списка",
      icon: <CheckCircleFilled className="circle_oulined"/>,
      className: "succes_message",
      placement: "topRight",
    });

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const filteredData = TableDataSort.filter((item) => {
    const search = searchValue?.toLowerCase() || "";
    return (
      item.name.toLowerCase().includes(search) ||
      item.sort.toLowerCase().includes(search) ||
      item.sections.toLowerCase().includes(search)
    );
  });

  const columns: ColumnsType<SortData> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Названия сортов",
      dataIndex: "sort",
      key: "sort",
      sorter: (a, b) => a.sort.localeCompare(b.sort),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Разделы",
      dataIndex: "sections",
      key: "sections",
    },
    {
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="sort_columns_render">
          <EditOutlined
            className="sort_render_items" 
            onClick={() => handleOpenEditDrawer(record)}
          />
          <DeleteOutlined
            className="sort_render_items" 
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
    <div>
      <SortStyled>
        <h1>Сорт качество</h1>

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

          <Button type="primary" onClick={handleOpenCreateDrawer}>
            <PlusOutlined /> Добавить новый
          </Button>
        </div>

        <SortDrawer
          open={openDrawer}
          editingSort={editingSort}
          onClose={() => setOpenDrawer(false)}
        />

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.length,
            showSizeChanger: true,  
            pageSizeOptions: ['5', '10', '20', '50', '100'],
          }}
        />

        <Modal
          open={showDeleteModal}
          title="Подтверждение удаления"
          okText="Удалить"
          cancelText="Отменить"
          onOk={handleDelete}
          centered
          width={400}
          onCancel={() => setShowDeleteModal(false)}
        >
          Вы уверены, что хотите удалить этот элемент?
        </Modal>
      </SortStyled>
    </div>
  );
}

export default SortPage;