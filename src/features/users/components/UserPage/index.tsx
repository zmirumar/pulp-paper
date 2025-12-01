import { Button, Flex, Input, Modal } from "antd";
import UserForm from "../userForm";
import UserTable from "../userTable";
import { SearchOutLined } from "@/assets/Icons";
import { useState } from "react";

export interface IUser {
  id: number;
  fullName: string;
  login: string;
  password: string;
  phoneNumber: string;
  permissions: userFeatures[];
  userRoles: userFeatures[];
  last_activity: string;
}

interface userFeatures {
  id: number,
  name: string
}

const UsersPage = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [userData, setUserData] = useState<IUser[]>([
    {
      id: 1,
      fullName: "Jhon doe",
      login: "jhon.doe@gmail.com",
      password: "1234",
      phoneNumber: "+998999312222",
      permissions: [{ id: 1, name: "Admin" }],
      userRoles: [{ id: 1, name: "WRITE" }],
      last_activity: "19:01",
    },
  ]);

  const openDeleteModal = (id: number) => {
    setDeletingItemId(id);
    setIsModalOpen(true);
  };

   const openEdit = (user: IUser) => {
      setEditingUser(user);
      console.log("User",user)
      setDrawerOpen(true);
    }

  const handleDeleteUser = () => {
    if (deletingItemId !== null) {
      setIsModalOpen(false);
    }
  };
  
  const handleCencel = () => {
    setIsModalOpen(false);
    setDeletingItemId(null);
  };
  
  const createUser = () => {
    setEditingUser(null)
    setDrawerOpen(true)
  }


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
          />

          <Button type="primary" size="large" onClick={createUser}>
            + Добавить нового
          </Button>
        </Flex>

        <Modal
          open={isModalOpen}
          title="Подтверждение удаления"
          onCancel={handleCencel}
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

        <UserTable
          data={userData}
          onEdit={openEdit}
          handleCancel={handleCencel}
          openDeleteModal={openDeleteModal}
        />
        <UserForm
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          editingUser={editingUser}
          onSubmit={(values) => {
            if (editingUser) {
              console.log("EDITED", values);
            } else {
              console.log("add", values);
            }
            setDrawerOpen(false);
          }}
        />
      </Flex>
    </>
  );
};

export default UsersPage;
