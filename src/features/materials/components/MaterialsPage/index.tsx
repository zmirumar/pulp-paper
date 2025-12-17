import { useState } from "react";
import { Button, Tabs, Modal, Form, Input, Checkbox, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MaterialsStyled } from "./style";
import { Drawer } from "@/components/ui";
import { MaterialsTabs } from "@/features/materials/components/MaterialsTabs";
import { MaterialsTableData } from "@/mockdata/MaterialsData/materials";
import type { MaterialItem } from "@/interface";

const MaterialsPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MaterialItem | null>(null);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const openCreateDrawer = () => {
    setEditingItem(null);
    form.resetFields();
    setDrawerOpen(true);
    setIsDirty(false);
    setIsConfirmDisabled(true);
  };

  const openEditDrawer = (item: MaterialItem) => {
    setEditingItem(item);
    form.setFieldsValue({ name: item.name, isRaw: true, isList: false });
    setDrawerOpen(true);
    setIsDirty(false);
    setIsConfirmDisabled(false);
  };

  const onFormValuesChange = () => {
    const values = form.getFieldsValue();
    const originalValues = editingItem
      ? { name: editingItem.name, isRaw: true, isList: false }
      : { name: "", isRaw: false, isList: false };

    const dirty =
      values.name !== originalValues.name ||
      values.isRaw !== originalValues.isRaw ||
      values.isList !== originalValues.isList;

    setIsDirty(dirty);

    setIsConfirmDisabled(!values.name || (!values.isRaw && !values.isList));
  };

  const handleCloseDrawer = () => {
    if (!isDirty) {
      setDrawerOpen(false);
      return;
    }
    setUnsavedModalOpen(true);
  };

  const confirmCloseDrawer = () => {
    form.resetFields();
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
    form.resetFields();
    setDrawerOpen(false);
  };

  const handleDelete = () => {
    notification.success({
      message: "Товар сохранён",
      description: `Товар удален из списка`,
      placement: "topRight",
      icon: <CheckCircleFilled className="circle_oulined" />,
      duration: 3,
      className: "succes_message",
    });
  };

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
              setDeleteModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const tabsItems = [
    {
      key: "1",
      label: "Склад",
      children: (
        <MaterialsTabs
          columns={columns}
          navigate={navigate}
          openCreateDrawer={openCreateDrawer}
          data={MaterialsTableData}
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
    <MaterialsStyled>
      <h1>Тип материалов</h1>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabsItems} />

      <Modal
        title="Подтверждение удаления"
        open={deleteModalOpen}
        centered
        onCancel={() => setDeleteModalOpen(false)}
        onOk={() => {
          setDeleteModalOpen(false);
          handleDelete();
        }}
        okText="Продолжить"
        cancelText="Отменить"
      >
        <p>
          После удаления восстановить этот элемент будет невозможно. Продолжить?
        </p>
      </Modal>

      <Drawer
        title={editingItem ? "Изменить" : "Добавить новый"}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        showFooter
        confirmText={editingItem ? "Сохранить" : "Добавить"}
        cancelText="Отменить"
        onCancel={handleCloseDrawer}
        onConfirm={handleSave}
        confirmDisabled={isConfirmDisabled}
      >
        <Form form={form} layout="vertical" onValuesChange={onFormValuesChange}>
          <Form.Item name="name">
            <Input placeholder="Наименование" />
          </Form.Item>
          <Form.Item name="isRaw" valuePropName="checked">
            <Checkbox>Сырья склад</Checkbox>
          </Form.Item>
          <Form.Item name="isList" valuePropName="checked">
            <Checkbox>Показать в списках</Checkbox>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title="Несохранённые изменения"
        open={unsavedModalOpen}
        centered
        onCancel={() => setUnsavedModalOpen(false)}
        onOk={confirmCloseDrawer}
        okText="Продолжить"
        cancelText="Отменить"
      >
        <p>Все несохранённые изменения будут потеряны. Продолжить?</p>
      </Modal>
    </MaterialsStyled>
  );
};

export default MaterialsPage;
