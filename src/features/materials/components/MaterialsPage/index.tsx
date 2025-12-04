import { useState } from "react";
import { Button, Tabs, Input, Checkbox, notification } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { MaterialsStyled, ModalStyled, MaterialsDrawerStyled } from "./style";
import MaterialsTable from "../MaterialsTable";
import { MaterialsTableData } from "@/mockdata/MaterialsData/materials";
import "@/styles/drawer.css";

const MaterialsPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [modalConfirmCancel, setModalConfirmCancel] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [materialsName, setMaterialsName] = useState("");
  const [isRawChecked, setIsRawChecked] = useState(false);
  const [isListChecked, setIsListChecked] = useState(false);

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

  const handleOpenDrawer = () => setOpenDrawer(true);

  const handleAddMaterial = () => {
    notification.success({
      message: "Товар добавлен",
      description: `Новый товар успешно добавлен в список`,
      placement: "topRight",
      icon: <CheckCircleFilled className="circle_oulined" />,
      duration: 3,
      className: "succes_message",
    });
    setOpenDrawer(false);
    resetDrawerForm();
  };

  const resetDrawerForm = () => {
    setMaterialsName("");
    setIsRawChecked(false);
    setIsListChecked(false);
  };
  const handleCancelDrawer = () => {
    if (!materialsName && !isRawChecked && !isListChecked) {
      setOpenDrawer(false);
    } else {
      setModalConfirmCancel(true);
    }
  };

  const handleConfirmCancel = () => {
    setOpenDrawer(false);
    setModalConfirmCancel(false);
    resetDrawerForm();
  };

  const handleCloseModal = () => {
    setModalConfirmCancel(false);
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
              <Button
                onClick={handleOpenDrawer}
                className="materials__button"
                icon={<PlusOutlined />}
              >
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
              onClick={() => {
                setOpen(false);
                setSelected(null);
              }}
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

        <MaterialsDrawerStyled
          title="Добавить новый"
          open={openDrawer}
          onClose={handleCancelDrawer}
          showFooter={true}
          cancelText="Отменить"
          confirmText="Добавить"
          onCancel={handleCancelDrawer}
          onConfirm={handleAddMaterial}
          confirmDisabled={
            !(materialsName.trim() && (isRawChecked || isListChecked))
          }
        >
          <div className="drawer">
            <Input
              className="drawer__input"
              placeholder="Наименование"
              value={materialsName}
              onChange={(e) => setMaterialsName(e.target.value)}
            />
            <p className="drawer__text">Разделы</p>
            <Checkbox
              className="drawer__checkbox"
              checked={isRawChecked}
              onChange={(e) => setIsRawChecked(e.target.checked)}
            >
              Сырья склад
            </Checkbox>
            <Checkbox
              className="drawer__checkbox"
              checked={isListChecked}
              onChange={(e) => setIsListChecked(e.target.checked)}
            >
              Показать в списках
            </Checkbox>
          </div>
        </MaterialsDrawerStyled>

        <ModalStyled
          open={modalConfirmCancel}
          title="Несохранённые изменения"
          onOk={handleConfirmCancel}
          onCancel={handleCloseModal}
          footer={[
            <Button key="no" onClick={handleCloseModal}>
              Отменить
            </Button>,
            <Button key="yes" type="primary" onClick={handleConfirmCancel}>
              Продолжить
            </Button>,
          ]}
        >
          <p>Все несохранённые изменения будут потеряны. Продолжить?</p>
        </ModalStyled>
      </div>
    </MaterialsStyled>
  );
};

export default MaterialsPage;
