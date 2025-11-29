import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useState, useMemo } from "react";
import { API } from "@/service/api";
import type { IUser } from "../..";

export const useUsers = (searchValue: string) => {
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [userData, setUserData] = useState<IUser[] | null>();

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      API.getUsers().then((res) => {
        setUserData(res.data.users);
        return res.data.users;
      }),
  });

  const create = useMutation({
    mutationFn: API.createUser,
    onSuccess: () => {
      notification.success({
        message: "Готово",
        description: "Пользователь успешно добавлен",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDrawerOpen(false);
    },
    onError: () => {
      notification.error({
        message: "Ошибка",
        description: "Не удалось добавить пользователя",
        placement: "topRight",
      });
    },
  });

  const update = useMutation({
    mutationFn: (user: IUser) => API.updateUser(user),
    onSuccess: () => {
      notification.success({
        message: "Готово",
        description: "Данные успешно обновлены",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDrawerOpen(false);
    },
    onError: () => {
      notification.error({
        message: "Ошибка",
        description: "Не удалось обновить данные",
        placement: "topRight",
      });
    },
  });

  const remove = useMutation({
    mutationFn: API.deleteUser,
    onSuccess: () => {
      notification.success({
        message: "Удалено",
        description: "Пользователь удалён из списка",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      notification.error({
        message: "Ошибка",
        description: "Не удалось удалить пользователя",
        placement: "topRight",
      });
    },
  });

  const openDeleteModal = (id: number) => {
    setDeletingItemId(id);
    setIsModalOpen(true);
  };

  const handleDeleteUser = () => {
    if (deletingItemId !== null) {
      remove.mutate(deletingItemId);
      setIsModalOpen(false);
    }
  };

  const handleCencil = () => {
    setIsModalOpen(false);
    setDeletingItemId(null);
  };

  const filteredData = useMemo(() => {
    const searchLower = searchValue.toLowerCase().trim();
    return (userData ?? []).filter(
      (u) =>
        u.fullName.toLowerCase().includes(searchLower) ||
        u.phoneNumber.toLowerCase().includes(searchLower)
    );
  }, [searchValue, userData]);

  return {
    users: filteredData,
    isLoading,
    drawerOpen,
    editingUser,
    openAdd: () => {
      setEditingUser(null);
      setDrawerOpen(true);
    },
    openEdit: (user: IUser) => {
      setEditingUser(user);
      setDrawerOpen(true);
    },
    closeDrawer: () => {
      setDrawerOpen(false);
      setEditingUser(null);
    },
    addUser: create.mutate,
    setDrawerOpen,
    updateUser: update.mutate,
    deleteUser: openDeleteModal,

    isModalOpen,
    deletingItemId,
    handleDeleteUser,
    handleCencil,
  };
};
