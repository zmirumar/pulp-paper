import { Button, Form, Input, Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import { UserFormStyled, UserFormStyledBtns } from "./style";
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
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }

    if (editingUser) {
      loadUserData(editingUser);
    }
  }, [open, editingUser]);

  const resetForm = () => {
    form.resetFields();
    setAllRoles(false);
    setAllPerms(false);
  };

  const loadUserData = (user: IUser) => {
    const roleIds = user.userRoles?.map((r) => r.id) || [];
    const permissionIds = user.permissions?.map((p) => p.id) || [];

    form.setFieldsValue({
      ...user,
      roleIds,
      permissionIds,
    });

    setAllRoles(roleIds.length === roleOptions.length);
    setAllPerms(permissionIds.length === permOptions.length);
  };

  const handleSelectAll = (
    checked: boolean,
    field: "roleIds" | "permissionIds",
    options: { id: number }[],
    setAll: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setAll(checked);
    form.setFieldsValue({ [field]: checked ? options.map((o) => o.id) : [] });
  };

  const handleRolesSelectAll = (checked: boolean) => {
    handleSelectAll(checked, "roleIds", roleOptions, setAllRoles);
  };

  const handlePermsSelectAll = (checked: boolean) => {
    handleSelectAll(checked, "permissionIds", permOptions, setAllPerms);
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
        content: "Все несохранённые изменения будут потеряны. Продолжить?",
        okText: "Продолжить",
        cancelText: "Отменить",
        onOk: onClose,
      });
    } else {
      onClose();
    }
  };

  const checkFormValidity = () => {
    const values = form.getFieldsValue();
    return (
      Boolean(values.fullName) &&
      Boolean(values.login) &&
      Boolean(values.phoneNumber) &&
      (editingUser || Boolean(values.password))
    );
  };

  const isFormTouched = form.isFieldsTouched();
  const isFormValid = checkFormValidity();

  const roleCheckboxOptions = roleOptions.map((o) => ({
    label: o.name,
    value: o.id,
  }));

  const permCheckboxOptions = permOptions.map((o) => ({
    label: o.name,
    value: o.id,
  }));

  const drawerFooter = (
    <UserFormStyledBtns>
      <Button
        disabled={!isFormTouched}
        className="button cancel"
        onClick={confirmCancel}
      >
        Отмена
      </Button>
      <Button
        className="button confirm"
        type="primary"
        disabled={!isFormValid}
        onClick={() => form.submit()}
      >
        {editingUser ? "Сохранить" : "Добавить"}
      </Button>
    </UserFormStyledBtns>
  );

  return (
    <Drawer
      showFooter={true}
      title={
        editingUser ? "Изменить пользователь" : "Добавить новый пользователь"
      }
      open={open}
      onClose={confirmCancel}
      footer={drawerFooter}
    >
      <UserFormStyled>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={() => forceUpdate({})}
        >
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

          <Form.Item label="Отдел" className="checkbox-wrapper">
            <Checkbox
              checked={allRoles}
              onChange={(e) => handleRolesSelectAll(e.target.checked)}
            >
              Все
            </Checkbox>
            <Form.Item name="roleIds">
              <Checkbox.Group options={roleCheckboxOptions} />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Раздел" className="checkbox-wrapper">
            <Checkbox
              checked={allPerms}
              onChange={(e) => handlePermsSelectAll(e.target.checked)}
            >
              Все
            </Checkbox>
            <Form.Item name="permissionIds">
              <Checkbox.Group options={permCheckboxOptions} />
            </Form.Item>
          </Form.Item>
        </Form>
      </UserFormStyled>
    </Drawer>
  );
};

export default UserForm;