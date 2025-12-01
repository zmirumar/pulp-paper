import { useState } from "react";
import { Button, Modal, Tabs, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { MaterialsStyled } from "./style";
import MaterialsTable from "../MaterialsTable";
import { MaterialsTableData } from "@/mockdata/MaterialsData/materials";

const MaterialsPage = () => {
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
    <MaterialsStyled>
      <div className="materials">
        <h1>Тип материалов</h1>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />

        {activeTab === "1" && (
          <>
            <div className="materials__site" style={{ marginBottom: 15 }}>
              <Input
                type="text"
                placeholder="Поиск"
                className="materials__input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                suffix={<SearchOutlined />}
                style={{ width: 300, marginRight: 10 }}
              />
              <Button className="materials__button" icon={<PlusOutlined />}>
                Добавит новый материала
              </Button>
            </div>

            <MaterialsTable
              data={MaterialsTableData}
              searchValue={searchValue}
              onDeleteClick={handleDelete}
            />
          </>
        )}

        {activeTab === "2" && (
          <div className="not-found">
            <h2>Not Found</h2>
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
    </MaterialsStyled>
  );
};

export default MaterialsPage;
