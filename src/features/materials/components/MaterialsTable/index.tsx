import { useState, useMemo } from "react";
import { Table, Checkbox, Button, Input, notification, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import {
  MaterialsDrawerStyled,
  ModalStyled,
} from "@/features/materials/components/MaterialsPage/style";

export interface MaterialItem {
  id: number;
  name: string;
  section: string;
}

interface MaterialsTableProps {
  data: MaterialItem[];
  searchValue: string;
  onDeleteClick?: (record: MaterialItem) => void;
  onRowClick?: (record: MaterialItem) => void;
  onSave?: (data: MaterialItem) => void;
}

const MaterialsTable = ({
  data,
  searchValue,
  onDeleteClick,
  onRowClick,
  onSave,
}: MaterialsTableProps) => {
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalConfirmCancel, setModalConfirmCancel] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<MaterialItem | null>(
    null
  );

  const [materialsName, setMaterialsName] = useState("");
  const [isRawChecked, setIsRawChecked] = useState(false);
  const [isListChecked, setIsListChecked] = useState(false);

  const isFormValid = materialsName.trim() !== "";

  const handleEdit = (record: MaterialItem) => {
    setCurrentMaterial(record);
    setMaterialsName(record.name);
    setIsRawChecked(record.section.includes("Сырья"));
    setIsListChecked(record.section.includes("списках"));
    setDrawerOpen(true);
  };

  const handleSave = () => {
    const section = `${isRawChecked ? "Сырья" : ""} ${
      isListChecked ? "списках" : ""
    }`.trim();
    const newData = {
      id: currentMaterial?.id || Date.now(),
      name: materialsName,
      section,
    };

    if (onSave) onSave(newData);

    notification.success({
      message: "Изменения сохранены",
      description: `Ваши изменения были успешно применены`,
      placement: "topRight",
      icon: <CheckCircleFilled className="circle_oulined" />,
      duration: 3,
      className: "succes_message",
    });

    setDrawerOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setMaterialsName("");
    setIsRawChecked(false);
    setIsListChecked(false);
    setCurrentMaterial(null);
  };

  const handleCancelDrawer = () => {
    if (!materialsName && !isRawChecked && !isListChecked) {
      setDrawerOpen(false);
      resetForm();
    } else {
      setModalConfirmCancel(true);
    }
  };

  const handleConfirmCancel = () => {
    setDrawerOpen(false);
    setModalConfirmCancel(false);
    resetForm();
  };

  const handleCloseModal = () => setModalConfirmCancel(false);

  const columns: ColumnsType<MaterialItem> = [
    {
      title: "Наименование",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Разделы",
      dataIndex: "section",
      sorter: (a, b) => a.section.localeCompare(b.section),
    },
    {
      title: "Показать",
      render: () => <Checkbox onClick={(e) => e.stopPropagation()} />,
    },
    {
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "end", gap: 8 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick && onDeleteClick(record);
            }}
          />
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const lower = searchValue.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower)
    );
  }, [data, searchValue]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
        onRow={(record) => ({
          onClick: (event) => {
            const target = event.target as HTMLElement;
            if (
              target.closest("button") ||
              target.closest("input[type='checkbox']")
            )
              return;
            onRowClick && onRowClick(record);
            navigate(`/materialspage/${record.id}`);
          },
        })}
      />

      <MaterialsDrawerStyled
        title={currentMaterial ? "Редактировать материал" : "Добавить новый"}
        open={drawerOpen}
        onClose={handleCancelDrawer}
        showFooter
        cancelText="Отменить"
        confirmText={currentMaterial ? "Сохранить" : "Добавить"}
        onCancel={handleCancelDrawer}
        onConfirm={handleSave}
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
    </>
  );
};

export default MaterialsTable;
