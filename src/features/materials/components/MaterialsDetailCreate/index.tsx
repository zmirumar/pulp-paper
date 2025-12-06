import { useState } from "react";
import { Input, Select, Checkbox, Button, notification } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialsDetailCreateStyled, ModalStyled } from "./style";
import "@/styles/drawer.css";

const MaterialsDetailCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    unit: "",
    type: "",
    order: "",
    tara: "",
    productCode: "",
    sklad: "",
    param1: "",
    param2: "",
    param3: "",
    param4: "",
    showInList: false,
    maxPass: "",
    maxPassCheck: false,
  });

  const update = (field: string, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const inputsFilled =
    form.name &&
    form.code &&
    form.unit &&
    form.type &&
    form.order &&
    form.tara &&
    form.productCode &&
    form.sklad &&
    form.param1 &&
    form.param2 &&
    form.param3 &&
    form.param4;

  const valid =
    inputsFilled && form.showInList && form.maxPass && form.maxPassCheck;

  const handleEdit = () => {
    notification.success({
      message: "Товар добавлен",
      description: `Новый товар успешно добавлен в список`,
      placement: "topRight",
      icon: <CheckCircleFilled className="circle_oulined" />,
      duration: 3,
      className: "succes_message",
    });
    navigate(`/refs/material-types/${id}`);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <MaterialsDetailCreateStyled>
      <div>
        <h1 className="create__title">Добавить новый</h1>

        <p className="create__breadcrumb">
          Разделы / Тип материалов / <span>Добавить новый</span>
        </p>

        <div className="create__card">
          <div className="create__grid">
            <div className="create__field">
              <label>Наименование</label>
              <Input
                placeholder="Введите"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="create__field">
              <label>Код</label>
              <Input
                placeholder="Введите"
                value={form.code}
                onChange={(e) => update("code", e.target.value)}
              />
            </div>
            <div className="create__field">
              <label>Ед. изм</label>
              <Select
                placeholder="Выберите"
                value={form.unit || undefined}
                options={[
                  { label: "Кг", value: "Кг" },
                  { label: "Мл.гр", value: "Мл.гр" },
                  { label: "Шт", value: "Шт" },
                ]}
                onChange={(v) => update("unit", v)}
              />
            </div>
            <div className="create__field">
              <label>Тип материалов</label>
              <Select
                placeholder="Выберите"
                value={form.type || undefined}
                options={[
                  { label: "Салфетка B-1", value: "Салфетка B-1" },
                  { label: "Химикаты", value: "Химикаты" },
                ]}
                onChange={(v) => update("type", v)}
              />
            </div>
            <div className="create__field">
              <label>Порядок</label>
              <Input
                placeholder="Введите"
                value={form.order}
                onChange={(e) => update("order", e.target.value)}
              />
            </div>
            <div className="create__field">
              <label>Тара</label>
              <Select
                placeholder="Выберите"
                value={form.tara || undefined}
                options={[
                  { label: "118", value: "118" },
                  { label: "120", value: "120" },
                ]}
                onChange={(v) => update("tara", v)}
              />
            </div>
            <div className="create__field">
              <label>Код товара</label>
              <Input
                placeholder="Введите"
                value={form.productCode}
                onChange={(e) => update("productCode", e.target.value)}
              />
            </div>
            <div className="create__field">
              <label>Склад</label>
              <Select
                placeholder="Выберите"
                value={form.sklad || undefined}
                options={[
                  { label: "Склад", value: "Склад" },
                  { label: "Склад сырья", value: "Склад сырья" },
                ]}
                onChange={(v) => update("sklad", v)}
              />
            </div>
          </div>

          <hr />

          <div className="create__checkbox">
            <Checkbox
              disabled={!inputsFilled}
              checked={form.showInList}
              onChange={(e) => update("showInList", e.target.checked)}
            >
              Показать в списке
            </Checkbox>
          </div>

          <div className="create__grid">
            <div className="create__field">
              <label>Параметр 1</label>
              <Select
                placeholder="Выберите"
                value={form.param1 || undefined}
                options={[
                  { label: "14гр/м2", value: "14гр/м2" },
                  { label: "15гр/м2", value: "15гр/м2" },
                ]}
                onChange={(v) => update("param1", v)}
              />
            </div>
            <div className="create__field">
              <label>Параметр 2</label>
              <Select
                placeholder="Выберите"
                value={form.param2 || undefined}
                options={[
                  { label: "820мм", value: "820мм" },
                  { label: "700мм", value: "700мм" },
                ]}
                onChange={(v) => update("param2", v)}
              />
            </div>
            <div className="create__field">
              <label>Параметр 3</label>
              <Select
                placeholder="Выберите"
                value={form.param3 || undefined}
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                ]}
                onChange={(v) => update("param3", v)}
              />
            </div>
            <div className="create__field">
              <label>Параметр 4</label>
              <Input
                placeholder="Введите"
                value={form.param4}
                onChange={(e) => update("param4", e.target.value)}
              />
            </div>
          </div>

          <div className="create__max">
            <Checkbox
              disabled={form.maxPass === ""}
              checked={form.maxPassCheck}
              onChange={(e) => update("maxPassCheck", e.target.checked)}
            >
              Максимальный проход
            </Checkbox>
            <Input
              placeholder="0"
              value={form.maxPass}
              disabled={!form.showInList}
              onChange={(e) => update("maxPass", e.target.value)}
            />
          </div>

          <div className="create__footer">
            <Button
              className="cancel__button"
              onClick={() => setOpenModal(true)}
            >
              Отменить
            </Button>

            <Button type="primary" disabled={!valid} onClick={handleEdit}>
              Добавить
            </Button>
          </div>
        </div>

        <ModalStyled
          title="Несохранённые изменения"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          className="modal__small"
          footer={[
            <Button className="modal__cancel" onClick={handleCancel}>
              Отменить
            </Button>,
            <Button
              className="modal__continue"
              onClick={() => navigate(`/refs/material-types/${id}`)}
            >
              Продолжить
            </Button>,
          ]}
        >
          <p className="modal__text">
            Все несохранённые изменения будут потеряны. Продолжить?
          </p>
        </ModalStyled>
      </div>
    </MaterialsDetailCreateStyled>
  );
};

export default MaterialsDetailCreate;
