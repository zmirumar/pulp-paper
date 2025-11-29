import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MaterialsSearch from "@/features/Materiles/components/MaterialsSearch";
import MaterialsDetalsTable from "@/features/MaterialsDetalsPage/components/MaterialsDetalsTable";
import { MaterialsDetalsStyled } from "./style";

const MaterialsDetals = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

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

  const handleConfirmDelete = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <MaterialsDetalsStyled>
      <div className="materialsDetals">
        <h1>Тип материалов</h1>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />

        {activeTab === "1" && (
          <>
            <div className="materialsDetals__wrapper">
              <MaterialsSearch value={searchValue} onChange={setSearchValue} />
              <Button icon={<PlusOutlined />}>Добавить новый</Button>
            </div>

            <MaterialsDetalsTable
              searchValue={searchValue}
              onDelete={handleDelete}
            />
          </>
        )}

        {activeTab === "2" && (
          <div className="not-found">
            <h2>Not Found</h2>
            <p>Нет данных для отображения.</p>
          </div>
        )}

        <Modal
          title="Удалить материал?"
          open={open}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Отменить
            </Button>,
            <Button key="delete" danger onClick={handleConfirmDelete}>
              Удалить
            </Button>,
          ]}
        >
          <p>
            После удаления восстановить этот элемент будет невозможно.
            Продолжить?
          </p>
        </Modal>
      </div>
    </MaterialsDetalsStyled>
  );
};

export default MaterialsDetals;
