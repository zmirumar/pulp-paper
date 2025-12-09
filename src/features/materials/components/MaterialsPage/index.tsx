import { useState, useMemo } from "react";
import { Button, Tabs, Input, Checkbox, Table, notification } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MaterialsStyled, ModalStyled, MaterialsDrawerStyled } from "./style";
import { MaterialsTableData } from "@/mockdata/MaterialsData/materials";

interface MaterialItem {
  id: number;
  name: string;
  section: string;
}

const MaterialsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MaterialItem | null>(null);
  const [name, setName] = useState("");
  const [isRaw, setIsRaw] = useState(false);
  const [isList, setIsList] = useState(false);

  const resetForm = () => {
    setName("");
    setIsRaw(false);
    setIsList(false);
    setEditingItem(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setDrawerOpen(true);
  };

  const openEditDrawer = (item: MaterialItem) => {
    setEditingItem(item);
    setName(item.name);

    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    if (!name && !isRaw && !isList) {
      setDrawerOpen(false);
      return;
    }
    setUnsavedModalOpen(true);
  };

  const confirmCloseDrawer = () => {
    resetForm();
    setDrawerOpen(false);
    setUnsavedModalOpen(false);
  };

  const handleSave = () => {
    notification.success({
      message: editingItem ? "Изменения сохранены" : "Товар добавлен",
      description: editingItem
        ? "Ваши изменения были успешно применены"
        : "Новый товар успешно добавлен в список",
      icon: <CheckCircleFilled className="circle_oulined" />,
      className: "succes_message",
    });

    resetForm();
    setDrawerOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const filteredData = useMemo(() => {
    const searchText = searchValue.toLowerCase();
    return MaterialsTableData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText) ||
        item.section.toLowerCase().includes(searchText)
    );
  }, [searchValue]);

  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a: MaterialItem, b: MaterialItem) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Разделы",
      dataIndex: "section",
      sorter: (a: MaterialItem, b: MaterialItem) =>
        a.section.localeCompare(b.section),
    },
    {
      title: "Показать",
      render: () => <Checkbox onClick={(e) => e.stopPropagation()} />,
    },
    {
      render: (_: any, record: MaterialItem) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              openEditDrawer(record);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal();
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <MaterialsStyled>
      <h1>Тип материалов</h1>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "1", label: "Склад" },
          { key: "2", label: "Готовая продукция" },
        ]}
      />

      {activeTab === "1" && (
        <>
          <div className="materials__site" style={{ marginBottom: 15 }}>
            <Input
              placeholder="Поиск"
              value={searchValue}
              className="materials__input"
              onChange={(e) => setSearchValue(e.target.value)}
              suffix={<SearchOutlined style={{ color: "#00000073" }} />}
            />

            <Button icon={<PlusOutlined />} onClick={openCreateDrawer}>
              Добавить новый материал
            </Button>
          </div>

          <Table<MaterialItem>
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={false}
            onRow={(record) => ({
              onClick: () => navigate(`/refs/material-types/${record.id}`),
            })}
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
        onCancel={() => setDeleteModalOpen(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setDeleteModalOpen(false)}
            className="modal__cancel"
          >
            Отменить
          </Button>,
          <Button
            className="modal__delete"
            key="delete"
            danger
            onClick={() => setDeleteModalOpen(false)}
          >
            Удалить
          </Button>,
        ]}
      >
        <p>После удаления восстановить этот элемент будет невозможно.</p>
      </ModalStyled>

      <MaterialsDrawerStyled
        title={editingItem ? "Изменить" : "Добавить новый"}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        showFooter
        confirmText={editingItem ? "Сохранить" : "Добавить"}
        cancelText="Отменить"
        onCancel={handleCloseDrawer}
        onConfirm={handleSave}
        confirmDisabled={!(name.trim() && (isRaw || isList))}
      >
        <div className="drawer">
          <Input
            placeholder="Наименование"
            value={name}
            className="drawer__input"
            onChange={(e) => setName(e.target.value)}
          />

          <p className="drawer__text">Разделы</p>

          <Checkbox
            checked={isRaw}
            onChange={(e) => setIsRaw(e.target.checked)}
          >
            Сырья склад
          </Checkbox>

          <Checkbox
            checked={isList}
            onChange={(e) => setIsList(e.target.checked)}
          >
            Показать в списках
          </Checkbox>
        </div>
      </MaterialsDrawerStyled>

      <ModalStyled
        title="Несохранённые изменения"
        open={unsavedModalOpen}
        onCancel={() => setUnsavedModalOpen(false)}
        onOk={confirmCloseDrawer}
        okText="Продолжить"
        cancelText="Отменить"
      >
        <p className="modal__text">
          Все несохранённые изменения будут потеряны. Продолжить?
        </p>
      </ModalStyled>
    </MaterialsStyled>
  );
};

export default MaterialsPage;
