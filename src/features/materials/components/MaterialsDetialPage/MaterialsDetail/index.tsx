import { useState } from "react";
import { Button, Input, Modal, Tabs } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import MaterialsDetailTable from "@/features/materials/components/MaterialsDetialPage/MaterialsDetaillTable";
import { MaterialsDetialStyled } from "./style";
import { MaterialsDetailData } from "@/mockdata/MaterialsData/materialsDetail";
import { useNavigate } from "react-router-dom";

const MaterialsDetail = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const navigate = useNavigate();

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
    <MaterialsDetialStyled>
      <div className="materialsDetail">
        <h1 onClick={() => navigate("/materialspage")}>Тип материалов</h1>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />

        {activeTab === "1" && (
          <>
            <div className="materialsDetail__wrapper">
              <Input
                type="text"
                placeholder="Поиск"
                className="detial__input"
                value={searchValue}
                suffix={<SearchOutlined />}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: 300, marginRight: 10 }}
              />
              <Button icon={<PlusOutlined />}>Добавить новый</Button>
            </div>

            <MaterialsDetailTable
              data={MaterialsDetailData}
              searchValue={searchValue}
              onDelete={handleDelete}
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
    </MaterialsDetialStyled>
  );
};

export default MaterialsDetail;
