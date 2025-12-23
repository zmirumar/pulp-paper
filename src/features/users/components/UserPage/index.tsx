import { Button, Input, Modal, notification, Table } from "antd";
import UserForm from "../userForm";
import type { ColumnsType } from "antd/es/table";
import { PlusIcon, SearchOutLined, EditIcon, DeleteIcon } from "@/assets/Icons";
import type { IUser, IUserFeatures, ModalTypes} from "@/interface/users";
import { useState } from "react";
import { UserPageStyled } from "./style";
import { usersData } from "@/mockdata/users";

const UsersPage = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [confirmModal, setConfirmModal] = useState<ModalTypes>(null);

  const openEdit = (user: IUser) => {
    setEditingUser(user);
    setDrawerOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setConfirmModal(null);
    notification.success({
      message: "Пользватель удален",
      description: "Пользователь удалён из списка",
      placement: "topRight",
      className: "succes_message",
    });
    console.log(id)
  };

  const createUser = () => {
    setEditingUser(null);
    setDrawerOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmModal(null);
    setDrawerOpen(false);
  };

  const userManage = () => {
    if (editingUser) {
      notification.success({
        message: "Успешно изменено",
        description: "Изменения успешно обновлены",
        placement: "topRight",
        className: "succes_message",
      });
    } else {
      notification.success({
        message: "Пользователь добавлен",
        description: "Новый пользователь успешно добавлен в список",
        placement: "topRight",
        className: "succes_message",
      });
    }
    setDrawerOpen(false);
  };

  const isDeleteModal = confirmModal?.type === "delete";

  const columns: ColumnsType<IUser> = [
    {
      title: "Ф.И.Ш",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Отдел",
      dataIndex: "userRoles",
      key: "userRoles",
      render: (userRoles: IUserFeatures[] = []) =>
        userRoles.map((r) => r.name).join(", ") || "-",
    },
    {
      title: "Доступ",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: IUserFeatures[] = []) =>
        permissions.map((p) => p.name).join(", ") || "-",
    },
    {
      title: "Последняя активность",
      dataIndex: "last_activity",
      key: "last_activity",
    },
    {
      title: "",
      key: "actions",
      width: 120,
      render: (_: any, record: IUser) => (
        <div className="user-action-btns-wrapper">
          <Button
            type="text"
            icon={<img className="user-action-btn" src={EditIcon} alt="edit" />}
            onClick={() => openEdit(record)}
            title="Изменить"
          />

          <Button
            type="text"
            icon={
              <img className="user-action-btn" src={DeleteIcon} alt="delete" />
            }
            onClick={() =>
              setConfirmModal({ type: "delete", userId: record.id })
            }
            title="Удалить"
          />
        </div>
      ),
    },
  ];

  return (
    <UserPageStyled>
      <div className="userpage">
        <h2 className="userpage__title">Пользователи</h2>
        <div className="userpage__header_wrapper">
          <Input
            className="userpage__search_input"
            placeholder="Поиск"
            suffix={<img src={SearchOutLined} width={16} />}
            allowClear
          />

          <Button
            className="userpage__create_btn"
            type="primary"
            size="large"
            onClick={createUser}
          >
            <img src={PlusIcon} alt="plus_icon" /> Добавит новый
          </Button>
        </div>
        <Modal
          open={confirmModal !== null}
          title={
            isDeleteModal ? "Подтверждение удаления" : "Несохранённые изменения"
          }
          onCancel={() => setConfirmModal(null)}
          onOk={() =>
            isDeleteModal
              ? handleDeleteUser(confirmModal?.userId)
              : handleConfirmCancel()
          }
          okText={isDeleteModal ? "Удалить" : "Продолжить"}
          cancelText="Отменить"
          centered
        >
          <p>
            {isDeleteModal
              ? "После удаления восстановить этого пользователя будет невозможно. Продолжить?"
              : "Все несохранённые изменения будут потеряны. Продолжить?"}
          </p>
        </Modal>
        <UserForm
          setConfirmModal={setConfirmModal}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          editingUser={editingUser}
          onSubmit={userManage}
        />
        <Table<IUser>
          columns={columns}
          dataSource={usersData}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </div>
    </UserPageStyled>
  );
};

export default UsersPage;
