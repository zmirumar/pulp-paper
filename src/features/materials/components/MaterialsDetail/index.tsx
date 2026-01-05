import React, { useState } from "react";
import { Checkbox, Button, Tabs, notification, Modal } from "antd";
import {
  EditOutlined,
  CheckCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { MaterialsDetailStyled } from "./style";
import { MaterialsDetailData as data } from "@/mockdata/MaterialsData/materialsDetail";
import type { MaterialsListItem } from "@/interface";
import { MaterialsDetailTabs } from "@/features/materials/components/MaterialsDetailTabs";

const MaterialsDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [_, setSelectedToDelete] = useState<MaterialsListItem | null>(null);

  const columns: ColumnsType<MaterialsListItem> = [
    {
      title: "Прайс лист",
      dataIndex: "priyceList",
      render: () => <Checkbox />,
    },
    {
      title: "Порядок",
      dataIndex: "order",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Код",
      dataIndex: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Ед. изм",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Тип",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Вид материала",
      dataIndex: "materialKind",
      sorter: (a, b) => a.materialKind.localeCompare(b.materialKind),
    },
    {
      title: "Показать в списках",
      dataIndex: "section",
      render: () => <Checkbox />,
    },
    {
      title: "Разделы",
      dataIndex: "section",
      sorter: (a, b) => (a.section ?? "").localeCompare(b.section ?? ""),
    },
    {
      key: "actions",
      title: "",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/refs/material-types/${id}/edit`, { state: record });
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedToDelete(record);
              setDeleteModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSave = () => {
    notification.success({
      message: "Товар сохранён",
      description: `Товар удален из списка`,
      placement: "topRight",
      icon: <CheckCircleFilled className="circle_oulined" />,
      duration: 3,
      className: "succes_message",
    });
    setDeleteModalOpen(false);
  };

  const tabsItems = [
    {
      key: "1",
      label: "Склад",
      children: (
        <MaterialsDetailTabs
          data={data}
          columns={columns}
          navigate={navigate}
        />
      ),
    },
    {
      key: "2",
      label: "Готовая продукция",
      children: (
        <div className="not-found">
          <h2>Not Found</h2>
        </div>
      ),
    },
  ];

  return (
    <MaterialsDetailStyled>
      <h1>Тип материалов</h1>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as "1" | "2")}
        items={tabsItems}
      />

      <Modal
        centered
        title="Подтверждение удаления"
        open={deleteModalOpen}
        onCancel={() => {
          setSelectedToDelete(null);
          setDeleteModalOpen(false);
        }}
        onOk={() => {
          setDeleteModalOpen(false);
          handleSave();
          navigate("/refs/material-types/1");
        }}
        okText="Продолжить"
        cancelText="Отменить"
      >
        <p className="modal__text" style={{ width: "70%" }}>
          После удаления восстановить этот элемент будет невозможно. Продолжить?
        </p>
      </Modal>
    </MaterialsDetailStyled>
  );
};

export default MaterialsDetail;
