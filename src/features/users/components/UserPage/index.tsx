import { Button, Input, Modal, notification } from "antd";
import UserForm from "../userForm";
import UserTable from "../userTable";
import { SearchOutLined } from "@/assets/Icons";
import { useState, useMemo } from "react";
import { UserPageStyled } from "./style";
import { usersData } from "@/mockdata/users";

export interface IUser {
  id: number;
  fullName: string;
  login: string;
  password?: string;
  phoneNumber: string;
  permissions?: userFeatures[];
  userRoles?: userFeatures[];
  last_activity: string;
  roleIds?: number[];
  permissionIds?: number[];
}

interface userFeatures {
  id: number;
  name: string;
}

const UsersPage = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [userData, setUserData] = useState<IUser[]>(usersData);

  const openDeleteModal = (id: number) => {
    setDeletingItemId(id);
    setIsModalOpen(true);
  };

  const openEdit = (user: IUser) => {
    setEditingUser(user);
    setDrawerOpen(true);
  };

  const handleDeleteUser = () => {
    if (deletingItemId !== null) {
      setIsModalOpen(false);
      notification.success({
        message: "Удалено",
        description: "Пользователь удалён из списка",
        placement: "topRight",
      });
    }
  };

  const handleCencel = () => {
    setIsModalOpen(false);
    setDeletingItemId(null);
  };

  const createUser = () => {
    setEditingUser(null);
    setDrawerOpen(true);
  };

  const userMenage = () => {
    if (editingUser) {
      notification.success({
        message: "Успешно изменено",
        description: "Изменения успешно обновлены",
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Пользователь добавлен",
        description: "Новый пользователь успешно добавлен в список",
        placement: "topRight",
      });
    }
    setDrawerOpen(false);
  };

  const filteredData = useMemo(() => {
    const searchLower = searchValue.toLowerCase().trim();
    return (userData ?? []).filter(
      (u) =>
        u.fullName.toLowerCase().includes(searchLower) ||
        u.phoneNumber.toLowerCase().includes(searchLower)
    );
  }, [searchValue, userData]);

  return (
    <UserPageStyled>
      <div className="user-page">
        <h2 className="user-page-title">Пользователи</h2>
        <div className="user-page-header-wrapper">
          <Input
            className="search-input"
            placeholder="Поиск..."
            suffix={<img src={SearchOutLined} width={16} />}
            allowClear
            aria-selected
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Button
            className="create-btn"
            type="primary"
            size="large"
            onClick={createUser}
          >
            + Добавить нового
          </Button>
        </div>

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
          data={filteredData}
          onEdit={openEdit}
          openDeleteModal={openDeleteModal}
        />
        <UserForm
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          editingUser={editingUser}
          onSubmit={userMenage}
        />
      </div>
    </UserPageStyled>
  );
};

export default UsersPage;
