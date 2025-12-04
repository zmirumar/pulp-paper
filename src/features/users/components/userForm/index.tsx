import { Button, Form, Input, Checkbox, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import { UserFormStyled } from "./style";
import { roleOptions, permOptions } from "@/mockdata/users";
import type { IUser } from "../UserPage";
import { Drawer } from "@/components/ui";

interface UserFormProps {
  open: boolean;
  editingUser: IUser | null;
  onClose: () => void;
  onSubmit: (data: IUser) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  editingUser,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [allRoles, setAllRoles] = useState(false);
  const [allPerms, setAllPerms] = useState(false);

  const roleCount = useMemo(() => roleOptions.length, []);
  const permCount = useMemo(() => permOptions.length, []);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setAllRoles(false);
      setAllPerms(false);
      return;
    }

    form.resetFields();

    if (editingUser) {
      form.setFieldsValue({
        ...editingUser,
        roleIds: editingUser.userRoles?.map((r) => r.id) || [],
        permissionIds: editingUser.permissions?.map((p) => p.id) || [],
      });
      setAllRoles((editingUser.roleIds || []).length === roleCount);
      setAllPerms((editingUser.permissionIds || []).length === permCount);
    }
  }, [open, editingUser, form, roleCount, permCount]);

  const handleAllChange = (
    checked: boolean,
    field: "roleIds" | "permissionIds",
    options: { id: number }[],
    setAll: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setAll(checked);
    form.setFieldsValue({ [field]: checked ? options.map((o) => o.id) : [] });
  };

  const handleFinish = (values: IUser) => {
    const clean = {
      ...values,
      roleIds: values.roleIds?.filter((id) => id !== 1),
      permissionIds: values.permissionIds?.filter((id) => id !== 1),
    };
    onSubmit(clean);
  };

  const confirmCancel = () => {
    if (form.isFieldsTouched()) {
      Modal.confirm({
        icon: null,
        centered: true,
        title: "Несохранённые изменения",
        content: "Все несохранённые изменения будут потеряны.",
        okText: "Продолжить",
        cancelText: "Отменить",
        onOk: onClose,
      });
    } else {
      onClose();
    }
  };

  return (
    <Drawer
      className="form-wrapper"
      title={
        editingUser ? "Изменить пользователь" : "Добавить новый пользователь"
      }
      open={open}
      onClose={confirmCancel}
    >
      <UserFormStyled>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="fullName" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Имя" />
          </Form.Item>

          <Form.Item name="login" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Логин" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              rules={[{ required: true, message: "" }]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>
          )}

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Телефон" />
          </Form.Item>

          <Form.Item label="Отдел">
            <Checkbox
              checked={allRoles}
              onChange={(e) =>
                handleAllChange(
                  e.target.checked,
                  "roleIds",
                  roleOptions,
                  setAllRoles
                )
              }
            >
              Все
            </Checkbox>
            <Form.Item name="roleIds">
              <Checkbox.Group
                options={roleOptions.map((o) => ({
                  label: o.name,
                  value: o.id,
                }))}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Раздел">
            <Checkbox
              checked={allPerms}
              onChange={(e) =>
                handleAllChange(
                  e.target.checked,
                  "permissionIds",
                  permOptions,
                  setAllPerms
                )
              }
            >
              Все
            </Checkbox>
            <Form.Item name="permissionIds">
              <Checkbox.Group
                options={permOptions.map((o) => ({
                  label: o.name,
                  value: o.id,
                }))}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <div className="form-btns">
              <Button onClick={confirmCancel}>Отмена</Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? "Сохранить" : "Добавить"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </UserFormStyled>
    </Drawer>
  );
};

export default UserForm;
