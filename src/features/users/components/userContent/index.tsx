import { useState } from "react";
import { message } from "antd";

export interface IUser {
  id: number;
  name: string;
  login: string;
  password: string;
  number: string;
  access: string[];
  department: string[];
  last_activity: string;
}

const initialData: IUser[] = [
  {
    id: 1,
    name: "John Doe",
    login: "john.doe",
    password: "john123",
    number: "+99899239482",
    access: ["Склады"],
    department: ["Склады"],
    last_activity: "06.09.2025 13:23",
  },
];

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>(initialData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const addUser = (values: any) => {
    const newUser: IUser = {
      id: Date.now(),
      ...values,
      last_activity: new Date().toLocaleString("ru-RU"),
    };
    setUsers(prev => [...prev, newUser]);
    message.success("Пользователь добавлен!");
    setDrawerOpen(false);
  };

  const updateUser = (id: number, values: any) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, ...values, last_activity: new Date().toLocaleString("ru-RU") }
          : u
      )
    );
    message.success("Изменено!");
    setDrawerOpen(false);
    setEditingUser(null);
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    message.success("Удалено!");
  };

  const copyUser = (user: IUser) => {
    navigator.clipboard.writeText(`Логин: ${user.login}\nПароль: ${user.password}`);
    message.success("Скопировано в буфер!");
  };

  const openEdit = (user: IUser) => {
    setEditingUser(user);
    setDrawerOpen(true);
  };

  const openAdd = () => {
    setEditingUser(null);
    setDrawerOpen(true);
  };

  return {
    users,
    drawerOpen,
    editingUser,
    setDrawerOpen,
    addUser,
    updateUser,
    deleteUser,
    copyUser,
    openEdit,
    openAdd,
  };
};