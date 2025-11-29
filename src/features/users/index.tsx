import { Button, Flex, Input, Modal } from "antd";
import UserForm from "./components/userForm";
import UserTable from "./components/userTable";
import { useUsers } from "./components/userHooks";
import { SearchOutLined } from "@/assets/Icons";
import { useState } from "react";

export interface IUser {
  id: number;
  fullName: string;
  login: string;
  password: string;
  phoneNumber: string;
  permissions: string[];
  userRoles: string[];
  last_activity: string;
}

const UsersPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const {
    users,
    drawerOpen,
    editingUser,
    openAdd,
    openEdit,
    addUser,
    updateUser,
    deleteUser,
    setDrawerOpen,
    isModalOpen,
    handleDeleteUser,
    handleCencil,
  } = useUsers(searchValue);

  return (
    <>
      <Flex vertical gap={24} style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <h2>Пользователи</h2>
        </Flex>
        <Flex justify="space-between" align="center">
          <Input
            placeholder="Поиск..."
            suffix={<img src={SearchOutLined} width={16} />}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 240 }}
          />

          <Button type="primary" size="large" onClick={openAdd}>
            + Добавить нового
          </Button>
        </Flex>
        <UserTable users={users} onEdit={openEdit} onDelete={deleteUser} />
      </Flex>

      <Modal
        open={isModalOpen}
        title="Подтверждение удаления"
        onCancel={handleCencil}
        onOk={handleDeleteUser}
        okText="Да"
        cancelText="Нет"
        centered
      >
        <p>
          После удаления восстановить этого пользователя будет невозможно.
          Продолжить?
        </p>
      </Modal>

      <UserForm
        open={drawerOpen}
        editingUser={editingUser}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(values) => {
          if (editingUser) {
            updateUser({
              id: editingUser.id,
              ...values,
              password: "12345",
            });
          } else {
            addUser(values);
          }
          setDrawerOpen(false);
        }}
      />
    </>
  );
};

export default UsersPage;
