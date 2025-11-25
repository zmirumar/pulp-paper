import { useState } from "react";
import { Button, Tabs, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MaterialsStyled } from "./style";

import { MaterialsTable as mockData } from "@/mockdata/MaterialsData/materials";
import MaterialsTable from "@/features/Materiles/components/MaterialsTable";
import MaterialsSearch from "@/features/Materiles/components/MaterialsSearch";
import MaterialsList from "@/features/Materiles/components/MaterialsList";

const MaterialsPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [openList, setOpenList] = useState(false);

  const items = [
    { key: "1", label: "Склад" },
    { key: "2", label: "Готовая продукция" },
  ];

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
        <h1 className="materials__title">Тип материалов</h1>

        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />

        {activeTab === "1" && !openList && (
          <div className="materials__site">
            <MaterialsSearch value={searchValue} onChange={setSearchValue} />

            <Button className="add__btn" icon={<PlusOutlined />}>
              Добавить новый материал
            </Button>
          </div>
        )}

        {activeTab === "1" && !openList && (
          <MaterialsTable
            data={mockData}
            searchText={searchValue}
            onDeleteClick={handleDelete}
            onRowClick={() => setOpenList(true)}
          />
        )}

        {activeTab === "1" && openList && <MaterialsList />}

        {activeTab === "2" && (
          <div className="not-found">
            <h2>Not Found</h2>
            <p>Нет данных для отображения.</p>
          </div>
        )}
      </div>

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
