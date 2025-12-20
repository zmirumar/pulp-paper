import { useEffect, useState } from "react";
import { Form, Input, Modal, notification, Checkbox } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Drawer } from "@/components/ui/Drawer/Drawer";
import { ClientDrawerStyled } from "../../ClientsPage/ClientsDrawer/style";

export interface FinishedProductData {
  id: number;
  name: string;
  country: string;
  city: string;
  account: string;
  inn: string;
  okonh: string;
  employeeName: string;
  phones: string;
  addresses: string;
  sections: string[];
  isResident: boolean;
}

interface FinishedProductsDrawerProps {
  open: boolean;
  editingProduct: FinishedProductData | null;
  onClose: () => void;
}

const ALL_SECTIONS = ["finishedProducts", "warehouses"];

const FinishedProductsDrawer: React.FC<FinishedProductsDrawerProps> = ({
  open,
  editingProduct,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isEdit = editingProduct !== null;

  const sections = Form.useWatch("sections", form) || [];
  const allChecked = sections.length === ALL_SECTIONS.length;

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (editingProduct) {
      form.setFieldsValue(editingProduct);
    } else {
      form.resetFields();
    }
  }, [open, editingProduct, form]);

  const handleSubmit = async () => {
    await form.validateFields();
    notification.success({
      message: isEdit ? "Изменения сохранены" : "Продукт добавлен",
      icon: <CheckCircleFilled />,
      placement: "topRight",
    });
    onClose();
  };

  const handleCancel = () => {
    if (form.isFieldsTouched()) {
      setShowCancelModal(true);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Drawer
        open={open}
        title={isEdit ? "Редактировать" : "Добавить новый"}
        showFooter
        cancelText="Отменить"
        confirmText={isEdit ? "Сохранить" : "Добавить"}
        onCancel={handleCancel}
        onConfirm={handleSubmit}
      >
        <ClientDrawerStyled>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ sections: [], isResident: false }}
          >
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input placeholder="Наименование" />
            </Form.Item>

            <Form.Item name="country" rules={[{ required: true }]}>
              <Input placeholder="Страна" />
            </Form.Item>

            <Form.Item name="city" rules={[{ required: true }]}>
              <Input placeholder="Город" />
            </Form.Item>

            <Form.Item name="account" rules={[{ required: true }]}>
              <Input placeholder="Расчетный счет" />
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
                  <Checkbox value="finishedProducts">
                    Готовая продукция
                  </Checkbox>
                  <Checkbox value="warehouses">Склады</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Form.Item>

            <Form.Item name="isResident" valuePropName="checked">
              <Checkbox>Резидент</Checkbox>
            </Form.Item>

            <Form.Item name="inn" rules={[{ required: true }]}>
              <Input placeholder="ИНН" />
            </Form.Item>

            <Form.Item name="okonh" rules={[{ required: true }]}>
              <Input placeholder="ОКОНХ" />
            </Form.Item>

            <Form.Item name="employeeName" rules={[{ required: true }]}>
              <Input placeholder="Имя сотрудника" />
            </Form.Item>

            <Form.Item name="phones" rules={[{ required: true }]}>
              <Input placeholder="Телефоны" />
            </Form.Item>

            <Form.Item name="addresses" rules={[{ required: true }]}>
              <Input placeholder="Адреса" />
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

export default FinishedProductsDrawer;
