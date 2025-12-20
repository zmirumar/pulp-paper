import { useState } from "react";
import { Form, Input, Modal, notification, Select } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Drawer } from "@/components/ui/Drawer/Drawer";
import { SortDrawerStyled } from "./style";

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
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isEdit = Boolean(editingSort);

  Form.useWatch([], form);
  const isFormTouched = form.isFieldsTouched();

  const handleAttemptClose = () => {
    if (form.isFieldsTouched()) {
      setShowCancelModal(true);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleConfirmDiscard = () => {
    setShowCancelModal(false);
    handleClose();
  };

  const handleConfirm = () => {
    form
      .validateFields()
      .then(() => {
        notification.success({
          message: isEdit ? "Изменения сохранены" : "Сорт добавлен",
          description: isEdit
            ? "Изменения успешно применены"
            : "Новый сорт успешно добавлен",
          placement: "topRight",
          icon: <CheckCircleFilled className="circle_oulined" />,
          className: "succes_message",
        });
        handleClose();
      })

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
        confirmDisabled={!isFormTouched}
        closeButtonPosition="end"
      >
        <SortDrawerStyled>
          <Form
            form={form}
            layout="vertical"
            key={open ? (editingSort?.id || 'create') : 'closed'} 
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

export default SortDrawer;