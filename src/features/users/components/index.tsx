import { CopyIcon, DeleteIcon, EditIcon } from "@/assets/Icons";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  message,
  Modal,
} from "antd";
import { useState } from "react";
import { UserComponentStyled } from "./style";

interface IUser {
  id: number;
  name: string;
  login: string;
  password: string;
  number: string;
  access: string[];
  department: string[];
  last_activity: string;
}
interface IFormValues {
  name: string;
  login: string;
  password: string;
  number: string;
  access?: string[];
  department?: string[];
}

function Index() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<IUser | null>(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<IUser[]>([
    {
      id: 1,
      name: "John Doe",
      login: "john.doe",
      password: "john.passw",
      number: "+99899239482",
      access: ["Склады"],
      department: ["Склады"],
      last_activity: "06.09.2025 13:23",
    },
  ]);

  const columns = [
    {
      title: "Ф.И.Ш",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Отдел",
      dataIndex: "department",
      key: "department",
      render: (arr: string[]) => arr.join(", "),
    },
    {
      title: "Доступ",
      dataIndex: "access",
      key: "access",
      render: (arr: string[]) => arr.join(", "),
    },
    {
      title: "Последняя активность",
      dataIndex: "last_activity",
      key: "last_activity",
    },
    {
      title: "",
      key: "actions",
      render: (_: any, item: IUser) => (
        <Space>
          <Button
            onClick={() => handleEdit(item)}
            icon={<img src={EditIcon} />}
          />
          <Button
            onClick={() => handleDelete(item.id)}
            icon={<img src={DeleteIcon} />}
          />
          <Button icon={<img src={CopyIcon} onClick={() => handleCopy(item)}/>} />
        </Space>
      ),
    },
  ];

  const accessData = [
    "Все",
    "Справочники",
    "Аналитика",
    "Администрация",
    "Гатовая продукция",
    "Склады",
  ];
  const departmentData = [
    "Все",
    "Аналитика",
    "Администрация",
    "Гатовая продукция",
    "Склады",
  ];


  const handleEdit = (item: IUser) => {
    setEditingItem(item);
    form.setFieldsValue({
      name: item.name,
      login: item.login,
      password: item.password,
      number: item.number,
      access: item.access,
      department: item.department,
    });

    setOpenDrawer(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Удалить пользователя?",
      content: "Это действие нельзя отменить",
      onOk: () => {
        setData((prev) => prev.filter((u) => u.id !== id));
        message.success("Пользователь удалён");
      },
    });
  };

  const handleCopy = (user: IUser) => {
  navigator.clipboard.writeText(`Логин: ${user.login}\nПароль: ${user.password}`);
  message.success("Скопировано!");
};

  const handleSubmit = (value: IFormValues) => {
    if (editingItem) {
      setData((prev) =>
        prev.map((u) =>
          u.id === editingItem.id
            ? {
                ...u,
                name: value.name,
                login: value.login,
                password: value.password,
                number: value.number,
                access: value.access || [],
                department: value.department || [],
              }
            : u
        )
      );
      message.success("edit successful!");
      form.resetFields();
      setOpenDrawer(false);
      setEditingItem(null);
    } else {
      const newUser: IUser = {
        id: Date.now(),
        name: value.name,
        login: value.login,
        password: value.password,
        number: value.number,
        access: value.access || [],
        department: value.department || [],
        last_activity: new Date().toLocaleString(),
      };
      setData((prev) => [...prev, newUser]);
      message.success("user added!");
      form.resetFields();
      setOpenDrawer(false);
    }
  };

  return (
    <UserComponentStyled>
      <Drawer
        onClose={() => {
          form.resetFields();
          setOpenDrawer(false);
          setEditingItem(null);
        }}
        title={!editingItem ? "Добавить новый пользовател" : "Изменит пользователь"}
        open={openDrawer}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Имя пользователя" />
          </Form.Item>

          <Form.Item name="login" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Логин" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item name="number" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Номер" />
          </Form.Item>

          <Form.Item label="Отдел" name="department">
            <Checkbox.Group
              style={{ flexDirection: "column" }}
              options={departmentData}
            />
          </Form.Item>

          <Form.Item label="Раздел" name="access">
            <Checkbox.Group options={accessData} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setOpenDrawer(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      <h2>Пользователи</h2>
      <Button
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        {!editingItem? "+ Добавит новый": "Сохранить"}
      </Button>

      <Table
        rowSelection={{}}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </UserComponentStyled>
  );
}

export default Index;
