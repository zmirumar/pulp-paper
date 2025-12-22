import { useEffect, useState } from "react";
import { Form, Input, Modal, notification, Checkbox } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Drawer } from "@/components/ui/Drawer/Drawer";
import { ClientDrawerStyled } from "../../ClientsPage/ClientsDrawer/style";
import type { FinishedProductData } from "../FinishedProducts";

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
    if (open && editingProduct) {
      const sectionsArray = typeof editingProduct.sections === 'string' 
        ? editingProduct.sections.split(',').map(s => s.trim())
        : editingProduct.sections || [];

      form.setFieldsValue({
        name: editingProduct.name,
        country: editingProduct.country,
        city: editingProduct.city,
        account: editingProduct.account || '',
        inn: editingProduct.inn || '',
        okonh: editingProduct.okonh || '',
        employeeName: editingProduct.employeeName || '',
        phones: editingProduct.phones || '',
        addresses: editingProduct.addresses || '',
        sections: sectionsArray,
        isResident: editingProduct.isResident || false,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, editingProduct, form]);

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

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      
      notification.success({
        message: isEdit ? "Изменения сохранены" : "Продукт добавлен",
        description: isEdit 
          ? "Изменения успешно применены" 
          : "Новый продукт успешно добавлен",
        icon: <CheckCircleFilled className="circle_oulined" />,
        className: "succes_message",
        placement: "topRight",
      });
      
      handleClose();
    } catch  {
      notification.error({
        message: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        placement: "topRight",
      });
    }
  };

  return (
    <>
      <Drawer
        open={open}
        title={isEdit ? "Редактировать" : "Добавить новый"}
        onClose={handleAttemptClose}
        showFooter
        cancelText="Отменить"
        confirmText={isEdit ? "Сохранить" : "Добавить"}
        onCancel={handleAttemptClose}
        onConfirm={handleConfirm}
        confirmDisabled={!form.isFieldsTouched()}
        closeButtonPosition="end"
      >
        <ClientDrawerStyled>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ sections: [], isResident: false }}
          >
            <Form.Item 
              name="name" 
              label="Наименование"
              rules={[
                { required: true, message: "Введите наименование" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { min: 2, message: "Минимум 2 символа" }
              ]}
            >
              <Input placeholder="Наименование" />
            </Form.Item>

            <Form.Item 
              name="country" 
              label="Страна"
              rules={[
                { required: true, message: "Введите страну" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { min: 2, message: "Минимум 2 символа" }
              ]}
            >
              <Input placeholder="Страна" />
            </Form.Item>

            <Form.Item 
              name="city" 
              label="Город"
              rules={[
                { required: true, message: "Введите город" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { min: 2, message: "Минимум 2 символа" }
              ]}
            >
              <Input placeholder="Город" />
            </Form.Item>

            <Form.Item 
              name="account" 
              label="Расчетный счет"
              rules={[
                { required: true, message: "Введите расчетный счет" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { pattern: /^[0-9]+$/, message: "Только цифры" },
              ]}
            >
              <Input placeholder="Расчетный счет" maxLength={20} />
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
            </Form.Item>

            <Form.Item name="isResident" valuePropName="checked">
              <Checkbox>Резидент</Checkbox>
            </Form.Item>

            <Form.Item 
              name="inn" 
              label="ИНН"
              rules={[
                { required: true, message: "Введите ИНН" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { pattern: /^[0-9]+$/, message: "Только цифры" },
                { len: 9, message: "ИНН должен содержать 9 цифр" }
              ]}
            >
              <Input placeholder="ИНН" maxLength={9} />
            </Form.Item>

            <Form.Item 
              name="okonh" 
              label="ОКОНХ"
              rules={[
                { required: true, message: "Введите ОКОНХ" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { pattern: /^[0-9]+$/, message: "Только цифры" },
                { len: 5, message: "ОКОНХ должен содержать 5 цифр" }
              ]}
            >
              <Input placeholder="ОКОНХ" maxLength={5} />
            </Form.Item>

            <Form.Item 
              name="employeeName" 
              label="Имя сотрудника"
              rules={[
                { required: true, message: "Введите имя сотрудника" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { min: 2, message: "Минимум 2 символа" }
              ]}
            >
              <Input placeholder="Имя сотрудника" />
            </Form.Item>

            <Form.Item 
              name="phones" 
              label="Телефоны"
              rules={[
                { required: true, message: "Введите телефон" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { pattern: /^[\d\s+()-]+$/, message: "Неверный формат телефона" }
              ]}
            >
              <Input placeholder="+998 90 123 45 67" />
            </Form.Item>

            <Form.Item 
              name="addresses" 
              label="Адреса"
              rules={[
                { required: true, message: "Введите адрес" },
                { whitespace: true, message: "Поле не может быть пустым" },
                { min: 5, message: "Минимум 5 символов" }
              ]}
            >
              <Input placeholder="Адреса" />
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

export default FinishedProductsDrawer;