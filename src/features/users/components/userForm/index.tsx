import { Button, Form, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { UserFormStyled, UserFormStyledBtns } from "./style";
import { roleOptions, permOptions } from "@/mockdata/users";
import type { IUser, UserFormProps } from "@/interface/users";
import { Drawer, Input } from "@/components/ui";

const UserForm: React.FC<UserFormProps> = ({
  open,
  editingUser,
  onClose,
  onSubmit,
  setConfirmModal,
}) => {
  const [form] = Form.useForm();
  const [allRoles, setAllRoles] = useState<boolean>(false);
  const [allPerms, setAllPerms] = useState<boolean>(false);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!open) return resetForm();

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

  const handleDrawerClose = () => {
    if (isFormTouched) {
      setConfirmModal({ type: "unsaved" });
    } else {
      onClose();
    }
  };

  const isCheckFormValid = () => {
    const values = form.getFieldsValue();
    return (
      Boolean(values.fullName) &&
      Boolean(values.login) &&
      Boolean(values.phoneNumber) &&
      (values.permissionIds?.length > 0) &&
      (values.roleIds?.length > 0) &&
      (editingUser || Boolean(values.password))
    );
  };

  const isFormTouched = form.isFieldsTouched(false);
  const isFormValid = isCheckFormValid();

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
        onClick={handleDrawerClose}
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
      onClose={handleDrawerClose}
      footer={drawerFooter}
    >
      <UserFormStyled>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={() => forceUpdate({})}
        >
          <Input
            name="fullName"
            rules={[{ required: true, message: "" }]}
            placeholder="Имя пользователя"
          />
          <Input
            name="login"
            rules={[{ required: true, message: "" }]}
            placeholder="Логин"
          />
          {!editingUser && <Input
            name="password"
            rules={[{ required: true, message: "" }]}
            placeholder="Пароль"
          />}
          <Input
            name="phoneNumber"
            rules={[{ required: true, message: "" }]}
            placeholder="Номер"
          />

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
