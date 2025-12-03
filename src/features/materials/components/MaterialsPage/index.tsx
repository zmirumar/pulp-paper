import { useState } from "react";
import { Button, Tabs, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { MaterialsStyled, ModalStyled } from "./style";
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
                suffix={<SearchOutlined style={{ color: "#00000073" }} />}
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

        <ModalStyled
          title="Подтверждение удаления"
          open={open}
          onCancel={handleCancel}
          className="modal__site"
          footer={[
            <Button
              key="cancel"
              onClick={handleCancel}
              className="modal__cancel"
            >
              Отменить
            </Button>,
            <Button
              className="modal__delete"
              key="delete"
              danger
              onClick={handleConfirmDelete}
            >
              Удалить
            </Button>,
          ]}
        >
          <p className="modal__text">
            После удаления восстановить этот элемент будет невозможно.
            Продолжить?
          </p>
        </ModalStyled>
      </div>
    </MaterialsStyled>
  );
};

export default MaterialsPage;
