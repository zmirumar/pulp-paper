import { Button, Space } from "antd";
import { EditIcon, DeleteIcon } from "@/assets/Icons";
import type { IUser } from "../UserPage";
import { UserTableStyled } from "./style";
import type { ColumnsType } from "antd/es/table";

type IUserFeatures = {
  id: number;
  name: string;
};

interface Props {
  handleCancel: () => void;
  openDeleteModal: (id: number) => void;
  data: IUser[];
  onEdit: (user: IUser) => void;
}

const UserTable: React.FC<Props> = ({
  handleCancel,
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
            onClick={() => openDeleteModal(record.id)}
            title="Удалить"
          />
        </Space>
      ),
    },
  ];

  return (
    <UserTableStyled
      columns={columns as ColumnsType<unknown>}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
    ></UserTableStyled>
  );
};

export default UserTable;
