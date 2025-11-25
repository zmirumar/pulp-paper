// UsersPage.tsx (faqat shu yerda useUsers!)
import { Button, Flex } from "antd";
import UserForm from "./components/userForm";
import UserTable from "./components/userTable";
import { useUsers } from "./components/userHooks";

const UsersPage = () => {
  const {
    users,
    drawerOpen,
    editingUser,
    openAdd,
    openEdit,
    addUser,
    updateUser,
    deleteUser,
    copyUser,
    setDrawerOpen,
  } = useUsers();

  return (
    <>
      <Flex vertical gap={24} style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <h2>Пользователи ({users.length})</h2>
          <Button type="primary" size="large" onClick={openAdd}>
            + Добавить нового
          </Button>
        </Flex>

        <UserTable
          users={users}
          onEdit={openEdit}
          onDelete={deleteUser}
          onCopy={copyUser}
        />
      </Flex>

      <UserForm
        open={drawerOpen}
        editingUser={editingUser}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(values) => {
          if (editingUser) {
            updateUser(editingUser.id, values);
          } else {
            addUser(values);
          }
          setDrawerOpen(false);
        }}
      />
    </>
  );
};

export default UsersPage;