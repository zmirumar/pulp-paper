import { useEffect, useState } from "react";
import { Form, Input, Modal, notification, Checkbox } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Drawer } from "@/components/ui/Drawer/Drawer";
import { ClientDrawerStyled } from "./style";
import type { ClientData } from "../ClientsPage";

interface ClientsDrawerProps {
  open: boolean;
  editingClient: ClientData | null;
  onClose: () => void;
}

const ALL_SECTIONS = ["finishedProducts", "warehouses"];

const ClientsDrawer: React.FC<ClientsDrawerProps> = ({
  open,
  editingClient,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isEdit = editingClient !== null;

  const sections = Form.useWatch("sections", form) || [];
  const allChecked = sections.length === ALL_SECTIONS.length;

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (editingClient) {
      form.setFieldsValue(editingClient);
    } else {
      form.resetFields();
    }
  }, [open, editingClient, form]);

  const handleCancel = () => {
    if (form.isFieldsTouched()) {
      setShowCancelModal(true);
    } else {
      onClose();
    }
  };

  const handleConfirm = async () => {
    await form.validateFields();

    notification.success({
      message: isEdit ? "Изменения сохранены" : "Клиент добавлен",
      icon: <CheckCircleFilled />,
      placement: "topRight",
    });

    onClose();
  };

  return (
    <>
      <Drawer
        open={open}
        title={isEdit ? "Редактировать" : "Добавить новый"}
        onClose={handleCancel}
        showFooter
        confirmText={isEdit ? "Сохранить" : "Добавить"}
        cancelText="Отменить"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <ClientDrawerStyled>
          <Form form={form} layout="vertical" initialValues={{ sections: [] }}>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input placeholder="Наименование" />
            </Form.Item>

            <Form.Item name="country" rules={[{ required: true }]}>
              <Input placeholder="Страна" />
            </Form.Item>

            <Form.Item name="city" rules={[{ required: true }]}>
              <Input placeholder="Город" />
            </Form.Item>

            <Form.Item label="Раздел">
              <Checkbox
                checked={allChecked}
                indeterminate={sections.length > 0 && !allChecked}
                onChange={(e) =>
                  form.setFieldsValue({
                    sections: e.target.checked ? ALL_SECTIONS : [],
                  })
                }
              >
                Все
              </Checkbox>

              <Form.Item
                name="sections"
                rules={[{ required: true, type: "array", min: 1 }]}
              >
                <Checkbox.Group>
                  <Checkbox value="finishedProducts">Готовая продукция</Checkbox>
                  <Checkbox value="warehouses">Склады</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Form.Item>
          </Form>
        </ClientDrawerStyled>
      </Drawer>

      <Modal
        open={showCancelModal}
        centered
        title="Несохранённые изменения"
        onOk={onClose}
        onCancel={() => setShowCancelModal(false)}
      >
        Все несохранённые изменения будут потеряны. Продолжить?
      </Modal>
    </>
  );
};

export default ClientsDrawer;
