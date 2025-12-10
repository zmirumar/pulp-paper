import React, { useMemo, useState } from "react";
import { Table, Checkbox, Button, Input, Tabs, notification } from "antd";
import {
  EditOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { MaterialsDetailStyled, ModalStyled } from "./style";
import { MaterialsDetailData as initialData } from "@/mockdata/MaterialsData/materialsDetail";

export interface MaterialsListItem {
  id: number;
  priyceList: boolean;
  order: number;
  name: string;
  code: string;
  unit: string;
  type: string;
  materialKind: string;
  section?: string;
}

const MaterialsDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<MaterialsListItem[]>(initialData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] =
    useState<MaterialsListItem | null>(null);

  const filteredData = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.section ?? "").toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [data, searchValue]);

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
      description: `Изменения успешно сохранены`,
      placement: "topRight",
      icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      duration: 3,
      className: "succes_message",
    });
    setDeleteModalOpen(false);
  };

  return (
    <MaterialsDetailStyled>
      <div className="materialsDetail">
        <h1>Тип материалов</h1>

        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as "1" | "2")}
          items={[
            { key: "1", label: "Склад" },
            { key: "2", label: "Готовая продукция" },
          ]}
        />

        {activeTab === "1" && (
          <>
            <div className="materialsDetail__wrapper">
              <Input
                type="text"
                placeholder="Поиск"
                className="detail__input"
                value={searchValue}
                suffix={<SearchOutlined style={{ color: "#00000073" }} />}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <Button
                onClick={() => navigate(`/refs/material-types/${id}/create`)}
                icon={<PlusOutlined />}
                type="primary"
              >
                Добавить новый
              </Button>
            </div>

            <Table<MaterialsListItem>
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              scroll={{ x: 2649 }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "50", "100"],
                position: ["bottomCenter"],
              }}
            />
          </>
        )}

        {activeTab === "2" && (
          <div className="not-found">
            <h2>Not Found</h2>
          </div>
        )}

        <ModalStyled
          title="Подтверждение удаления"
          open={deleteModalOpen}
          onCancel={() => {
            setSelectedToDelete(null);
            setDeleteModalOpen(false);
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setSelectedToDelete(null);
                setDeleteModalOpen(false);
              }}
              className="modal__cancel"
            >
              Отменить
            </Button>,
            <Button
              key="delete"
              className="modal__delete"
              danger
              onClick={handleSave}
            >
              Удалить
            </Button>,
          ]}
        >
          <p className="modal__text">
            После удаления восстановить этот элемент будет невозможно.
            Продолжить?
          </p>
        </ModalStyled>
      </div>
    </MaterialsDetailStyled>
  );
};

export default MaterialsDetail;
