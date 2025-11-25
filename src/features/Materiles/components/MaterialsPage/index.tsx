import { useState } from "react";
import { Button, Tabs, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MaterialsStyled } from "./style";
import { MaterialsTable as mockData } from "@/mockdata/MaterialsData/materials";
import MaterialsTable from "@/features/Materiles/components/MaterialsTable";
import MaterialsSearch from "@/features/Materiles/components/MaterialsSearch";

const items = [
  { key: "1", label: "Склад" },
  { key: "2", label: "Готовая продукция" },
];

const MaterialsPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDelete = (record: any) => {
    setSelected(record);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleFakeDelete = () => {
    setOpen(false);
  };

  return (
    <MaterialsStyled>
      <div className="materials">
        <h1>Тип материалов</h1>

        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />

        {activeTab === "1" && (
          <div className="materiles_site" style={{ marginBottom: 20 }}>
            <MaterialsSearch value={searchValue} onChange={setSearchValue} />
            <Button className="add-btn" icon={<PlusOutlined />}>
              Добавить новый материал
            </Button>
          </div>
        )}
      </div>

      {activeTab === "1" ? (
        <MaterialsTable
          data={mockData}
          searchText={searchValue}
          onDeleteClick={handleDelete}
        />
      ) : (
        <div className="not-found">Not Found</div>
      )}

      <Modal
        title="Удалить материал?"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          После удаления восстановить этот элемент будет невозможно. Продолжить?
        </p>
        <div>
          <Button onClick={handleCancel}>Отменить</Button>
          <Button danger onClick={handleFakeDelete}>
            Удалить
          </Button>
        </div>
      </Modal>
    </MaterialsStyled>
  );
};

export default MaterialsPage;
