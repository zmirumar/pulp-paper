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
    if (open && editingClient) {
      const sectionsArray = typeof editingClient.sections === 'string' 
        ? editingClient.sections.split(',').map(s => s.trim())
        : editingClient.sections || [];

      form.setFieldsValue({
        name: editingClient.name,
        country: editingClient.country,
        city: editingClient.city,
        sections: sectionsArray,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, editingClient, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleAttemptClose = () => {
    if (form.isFieldsTouched()) {
      setShowCancelModal(true);
    } else {
      handleClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowCancelModal(false);
    handleClose();
  };

  const handleConfirm = () => {
    form
      .validateFields()
        notification.success({
          message: isEdit ? "Изменения сохранены" : "Клиент добавлен",
          description: isEdit 
            ? "Изменения успешно применены" 
            : "Новый клиент успешно добавлен",
          icon: <CheckCircleFilled className="circle_oulined" />,
          className: "succes_message",
          placement: "topRight",
        });
        handleClose();
  };

  return (
    <>
      <Drawer
        open={open}
        title={isEdit ? "Редактировать" : "Добавить новый"}
        onClose={handleAttemptClose}
        showFooter
        confirmText={isEdit ? "Сохранить" : "Добавить"}
        cancelText="Отменить"
        onConfirm={handleConfirm}
        onCancel={handleAttemptClose}
        confirmDisabled={!form.isFieldsTouched()}
        closeButtonPosition="end"
      >
        <ClientDrawerStyled>
          <Form 
            form={form} 
            layout="vertical" 
            initialValues={{ sections: [] }}
          >
            <Form.Item 
              name="name" 
              label="Наименование"
              rules={[
                { required: true, message: "Введите наименование" },
                { whitespace: true, message: "Поле не может быть пустым" }
              ]}
            >
              <Input placeholder="Наименование" />
            </Form.Item>

            <Form.Item 
              name="country" 
              label="Страна"
              rules={[
                { required: true, message: "Введите страну" },
                { whitespace: true, message: "Поле не может быть пустым" }
              ]}
            >
              <Input placeholder="Страна" />
            </Form.Item>

            <Form.Item 
              name="city" 
              label="Город"
              rules={[
                { required: true, message: "Введите город" },
                { whitespace: true, message: "Поле не может быть пустым" }
              ]}
            >
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
                rules={[
                  { 
                    required: true, 
                    type: "array", 
                    min: 1,
                    message: "Выберите хотя бы один раздел"
                  }
                ]}
                style={{ marginBottom: 0 }}
              >
                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <Checkbox value="finishedProducts">Готовая продукция</Checkbox>
                  <Checkbox value="warehouses">Склады</Checkbox>
                </Checkbox.Group>
              </Form.Item>
                      <Form.Item name="isResident" valuePropName="checked">
              <Checkbox>Резидент</Checkbox>
            </Form.Item>

            <Form.Item name="inn" >
              <Input placeholder="ИНН" />
            </Form.Item>

            <Form.Item name="okonh" >
              <Input placeholder="ОКОНХ" />
            </Form.Item>

            <Form.Item name="employeeName" >
              <Input placeholder="Имя сотрудника" />
            </Form.Item>

            <Form.Item name="phones" >
              <Input placeholder="Телефоны" />
            </Form.Item>

            <Form.Item name="addresses" >
              <Input placeholder="Адреса" />
            </Form.Item>
            </Form.Item>
          </Form>
        </ClientDrawerStyled>
      </Drawer>

      <Modal
        open={showCancelModal}
        centered
        width={400}
        title="Несохранённые изменения"
        okText="Продолжить"
        cancelText="Отменить"
        onOk={handleConfirmDiscard}
        onCancel={() => setShowCancelModal(false)}
        zIndex={2000}
      >
        Все несохранённые изменения будут потеряны. Продолжить?
      </Modal>
    </>
  );
};

export default ClientsDrawer;