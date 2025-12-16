import { useState, useEffect, useCallback } from "react";
import { SortDrawerStyled } from "./style";
import { Form, Input, Modal, notification, Select } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Drawer } from "@/components/ui/Drawer/Drawer";

interface SortData {
  id: number;
  name: string;
  sort: string;
  sections: string;
}

interface SortDrawerProps {
  open: boolean;
  editingSort: SortData | null;
  onClose: () => void;
}

const SortDrawer: React.FC<SortDrawerProps> = ({
  open,
  editingSort,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isEdit = Boolean(editingSort);

  const hasUnsavedChanges = () => {
    const values = form.getFieldsValue();
    return form.isFieldsTouched() && (values.sort || values.sections);
  };

  const checkFormValidity = useCallback(() => {
    const values = form.getFieldsValue();
    setIsValid(!!(values.sort?.trim() && values.sections));
  }, [form]);

  useEffect(() => {
    if (!open) return;

    if (editingSort) {
      form.setFieldsValue({
        sort: editingSort.sort,
        sections: editingSort.sections,
      });
      setTimeout(checkFormValidity, 0);
    } else {
      form.resetFields();
      setIsValid(false);
    }
  }, [open, editingSort, form, checkFormValidity]);

  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      setShowCancelModal(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowCancelModal(false);
    form.resetFields();
    setIsValid(false);
    onClose();
  };

  const handleSubmit = async () => {
    await form.validateFields();

    notification.success({
      message: isEdit ? "Изменения сохранены" : "Сорт добавлен",
      description: isEdit
        ? "Изменения успешно применены"
        : "Новый сорт успешно добавлен",
      placement: "topRight",
      icon: <CheckCircleFilled className="circle_oulined"/>,
      className: "succes_message",
    });

    form.resetFields();
    setIsValid(false);
    onClose();
  };

  return (
    <>
      <Drawer
        open={open}
        title={isEdit ? "Редактировать" : "Добавить новый"}
        onClose={handleCancel}
        showFooter
        cancelText="Отменить"
        confirmText={isEdit ? "Сохранить" : "Добавить"}
        onCancel={handleCancel}
        onConfirm={handleSubmit}
        confirmDisabled={!isValid}
        closeButtonPosition="end"
      >
        <SortDrawerStyled>
          <Form
            form={form}
            layout="vertical"
            onValuesChange={checkFormValidity}
          >
            <Form.Item
              name="sort"
              rules={[
                { required: true, message: "Введите название сорта" },
                { whitespace: true, message: "Поле не может быть пустым" },
              ]}
            >
              <Input placeholder="Название сорта" />
            </Form.Item>

            <Form.Item
              name="sections"
              rules={[{ required: true, message: "Выберите раздел" }]}
            >
              <Select
                placeholder="Раздел"
                options={[
                  { value: "Готовый продукция", label: "Готовый продукция" },
                  { value: "Склад сырья", label: "Склад сырья" },
                ]}
              />
            </Form.Item>
          </Form>
        </SortDrawerStyled>
      </Drawer>

      <Modal
        open={showCancelModal}
        centered
        title="Несохранённые изменения"
        okText="Продолжить"
        cancelText="Отменить"
        onOk={handleConfirmDiscard}
        width={400}
        onCancel={() => setShowCancelModal(false)}
      >
        Все несохранённые изменения будут потеряны. Продолжить?
      </Modal>
    </>
  );
};

export default SortDrawer;
