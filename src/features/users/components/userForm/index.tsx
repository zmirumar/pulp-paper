import { Button, Drawer, Form, Input, Checkbox, Space } from "antd";
import { useEffect } from "react";
import type { IUser } from "../UserPage";
import { roleOptions, permOptions } from "@/mockdata/users";

interface Props {
  open: boolean;
  editingUser: IUser | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const UserForm: React.FC<Props> = ({ open, editingUser, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      editingUser ? form.setFieldsValue(editingUser) : form.resetFields();
    }
  }, [open, editingUser]);

  return (
    <Drawer
      title={
        editingUser ? "Изменит пользователь" : "Добавить новый пользовател"
      }
      open={open}
      onClose={onClose}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item name="fullName" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item name="login" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Логин" />
        </Form.Item>

        {!editingUser && (
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
        )}

        <Form.Item name="phoneNumber" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Телефон" />
        </Form.Item>

        <Form.Item name="roleIds" label="Отдел">
          <Checkbox.Group
            options={roleOptions.map((i) => ({ label: i.name, value: i.id }))}
          />
        </Form.Item>

        <Form.Item name="permissionIds" label="Доступ">
          <Checkbox.Group
            options={permOptions.map((i) => ({
              label: i.name,
              value: i.id,
            }))}
          />
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
