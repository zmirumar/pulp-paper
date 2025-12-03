import { useState } from "react";
import { Button, Input, Tabs } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import MaterialsDetailTable from "@/features/materials/components/MaterialsDetaillTable";
import { MaterialsDetailStyled, ModalStyled } from "./style";
import { MaterialsDetailData } from "@/mockdata/MaterialsData/materialsDetail";
import { useNavigate, useParams } from "react-router-dom";

const MaterialsDetail = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
    <MaterialsDetailStyled>
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
                suffix={<SearchOutlined style={{ color: "#00000073" }} />}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                onClick={() => navigate(`/materialspage/${id}/create`)}
                icon={<PlusOutlined />}
              >
                Добавить новый
              </Button>
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
    </MaterialsDetailStyled>
  );
};

export default MaterialsDetail;
