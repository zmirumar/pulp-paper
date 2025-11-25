import { Button, Drawer, Form, Input, Checkbox, Space } from "antd";
import { useEffect } from "react";

const accessOptions = ["Все", "Склады", "Администрация", "Аналитика"];
const deptOptions = ["Все", "Склады", "Администрация", "Аналитика"];

type Props = {
  open: boolean;
  editingUser: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const UserForm: React.FC<Props> = ({ open, editingUser, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      editingUser ? form.setFieldsValue(editingUser) : form.resetFields();
    }
  }, [open, editingUser]);

  return (
    <Drawer
      title={editingUser ? "Изменить" : "Добавить нового"}
      open={open}
      onClose={onClose}
      width={420}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item name="name" rules={[{ required: true, message: "Введите имя" }]}>
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item name="login" rules={[{ required: true }]}>
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: !editingUser }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item name="number" rules={[{ required: true }]}>
          <Input placeholder="Телефон" />
        </Form.Item>

        <Form.Item name="department" label="Отдел">
          <Checkbox.Group options={deptOptions} />
        </Form.Item>

        <Form.Item name="access" label="Доступ">
          <Checkbox.Group options={accessOptions} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Сохранить" : "Добавить"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserForm;
