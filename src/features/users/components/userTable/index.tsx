import { Button, Space } from "antd";
import { EditIcon, DeleteIcon } from "@/assets/Icons";
import type { IUser } from "../..";
import { UserTableStyled } from "./style";
import type { ColumnsType } from "antd/es/table";

type Props = {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
};

type IUserFeatures = {
  id: number;
  name: string;
};

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
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
        <Space size="middle">
          <Button
            type="text"
            icon={<img src={EditIcon} alt="edit" style={{ width: 18 }} />}
            onClick={() => onEdit(record)}
            title="Изменить"
          />

          <Button
            type="text"
            icon={<img src={DeleteIcon} alt="delete" style={{ width: 18 }} />}
            onClick={() => onDelete(record.id)}
            title="Удалить"
          />
        </Space>
      ),
    },
  ];

  return (
    <UserTableStyled
      columns={columns as ColumnsType<unknown>}
      dataSource={users ?? []}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
      scroll={{ x: 1000 }}
      bordered
      style={{ background: "#fff" }}
    ></UserTableStyled>
  );
};

export default UserTable;
