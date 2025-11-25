
import { Button, Table, Space, Modal } from "antd";
import { EditIcon, DeleteIcon, CopyIcon } from "@/assets/Icons";
import type { IUser } from "../userHooks/index";

type Props = {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
  onCopy: (user: IUser) => void;
};

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete, onCopy }) => {
  const columns = [
    {
      title: "Ф.И.Ш",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Отдел",
      dataIndex: "department",
      key: "department",
      render: (departments: string[]) => departments?.join(", ") || "-",
    },
    {
      title: "Доступ",
      dataIndex: "access",
      key: "access",
      render: (access: string[]) => access?.join(", ") || "-",
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
          {/* Edit */}
          <Button
            type="text"
            icon={<img src={EditIcon} alt="edit" style={{ width: 18 }} />}
            onClick={() => onEdit(record)}
            title="Изменить"
          />

          {/* Delete */}
          <Button
            type="text"
            danger
            icon={<img src={DeleteIcon} alt="delete" style={{ width: 18 }} />}
            onClick={() =>
              Modal.confirm({
                title: "Удалить пользователя?",
                content: "Это действие нельзя отменить",
                okText: "Да, удалить",
                cancelText: "Отмена",
                onOk: () => onDelete(record.id),
              })
            }
            title="Удалить"
          />

          {/* Copy Login + Password */}
          <Button
            type="text"
            icon={<img src={CopyIcon} alt="copy" style={{ width: 18 }} />}
            onClick={() => onCopy(record)}
            title="Скопировать логин и пароль"
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1000 }}
      bordered
      style={{ background: "#fff" }}
    />
  );
};

export default UserTable;