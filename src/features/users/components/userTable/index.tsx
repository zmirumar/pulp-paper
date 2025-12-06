import { Button, Table } from "antd";
import { EditIcon, DeleteIcon } from "@/assets/Icons";
import type { IUser } from "../UserPage";
import { UserTableStyled } from "./style";
import type { ColumnsType } from "antd/es/table";

type IUserFeatures = {
  id: number;
  name: string;
};

interface Props {
  openDeleteModal: (id: number) => void;
  data: IUser[];
  onEdit: (user: IUser) => void;
}

const UserTable: React.FC<Props> = ({
  onEdit,
  openDeleteModal,
  data,
}) => {
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
            icon={
              <img
                className="user-action-btn"
                src={EditIcon}
                alt="edit"
              />
            }
            onClick={() => onEdit(record)}
            title="Изменить"
          />

          <Button
            type="text"
            icon={
              <img
                className="user-action-btn"
                src={DeleteIcon}
                alt="delete"
              />
            }
            onClick={() => openDeleteModal(record.id)}
            title="Удалить"
          />
        </div>
      ),
    },
  ];

  return (
    <UserTableStyled>
      <Table<IUser>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </UserTableStyled>
  );
};

export default UserTable;
