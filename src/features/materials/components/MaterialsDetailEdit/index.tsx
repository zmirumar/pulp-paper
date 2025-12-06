import { useState, useEffect } from "react";
import { Input, Select, Checkbox, Button, notification } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MaterialsDetailEditStyled, ModalStyled } from "./style";
import { CheckCircleFilled } from "@ant-design/icons";
import "@/styles/drawer.css";

const MaterialsDetailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const record = location.state;

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

  useEffect(() => {
    if (record) {
      setForm({
        name: record.name || "",
        code: record.code || "",
        unit: record.unit || "",
        type: record.type || "",
        order: record.order || "",
        tara: record.tara || "",
        productCode: record.productCode || "",
        sklad: record.sklad || "",
        param1: record.param1 || "",
        param2: record.param2 || "",
        param3: record.param3 || "",
        param4: record.param4 || "",
        showInList: record.showInList || false,
        maxPass: record.maxPass || "",
        maxPassCheck: record.maxPassCheck || false,
      });
    }
  }, [record]);

  const handleCancel = () => {
    setOpenModal(false);
  };

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
    form.sklad;

  const valid =
    inputsFilled && form.showInList && form.maxPass && form.maxPassCheck;

  const unitOptions = ["Кг", "Мл.гр", "Шт"];
  const typeOptions = ["Салфетка B-1", "Химикаты"];
  const taraOptions = ["118", "120"];
  const skladOptions = ["Склад", "Склад сырья"];
  const param1Options = ["14гр/м2", "15гр/м2"];
  const param2Options = ["820мм", "700мм"];
  const param3Options = ["1", "2"];

  const getValue = (value: string, options: string[]) =>
    value && options.includes(value) ? value : options[0];

  const handleSave = () => {
    notification.success({
      message: "Товар сохранён",
      description: `Изменения успешно сохранены`,
      placement: "topRight",
      icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      duration: 3,
      className: "succes_message",
    });
    navigate(`/refs/material-types/${id}`);
  };

  return (
    <MaterialsDetailEditStyled>
      <div className="detail__edit">
        <h1 className="edit__title">Изменить</h1>

        <p className="edit__breadcrumb">
          Разделы / Тип материалов / <span>Изменить</span>
        </p>

        <div className="edit__card">
          <div className="edit__grid">
            <div className="edit__field">
              <label>Наименование</label>
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="edit__field">
              <label>Код</label>
              <Input
                value={form.code}
                onChange={(e) => update("code", e.target.value)}
              />
            </div>
            <div className="edit__field">
              <label>Ед. изм</label>
              <Select
                value={getValue(form.unit, unitOptions)}
                options={unitOptions.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("unit", v)}
              />
            </div>
            <div className="edit__field">
              <label>Тип материалов</label>
              <Select
                value={getValue(form.type, typeOptions)}
                options={typeOptions.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("type", v)}
              />
            </div>
            <div className="edit__field">
              <label>Порядок</label>
              <Input
                value={form.order}
                onChange={(e) => update("order", e.target.value)}
              />
            </div>
            <div className="edit__field">
              <label>Тара</label>
              <Select
                value={getValue(form.tara, taraOptions)}
                options={taraOptions.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("tara", v)}
              />
            </div>
            <div className="edit__field">
              <label>Код товара</label>
              <Input
                value={form.productCode}
                onChange={(e) => update("productCode", e.target.value)}
              />
            </div>
            <div className="edit__field">
              <label>Склад</label>
              <Select
                value={getValue(form.sklad, skladOptions)}
                options={skladOptions.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("sklad", v)}
              />
            </div>
          </div>

          <hr />

          <Checkbox
            className="edit__checkbox"
            disabled={!inputsFilled}
            checked={form.showInList}
            onChange={(e) => update("showInList", e.target.checked)}
          >
            Показать в списке
          </Checkbox>

          <div className="edit__grid">
            <div className="edit__field">
              <label>Параметр 1</label>
              <Select
                value={getValue(form.param1, param1Options)}
                options={param1Options.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("param1", v)}
              />
            </div>
            <div className="edit__field">
              <label>Параметр 2</label>
              <Select
                value={getValue(form.param2, param2Options)}
                options={param2Options.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("param2", v)}
              />
            </div>
            <div className="edit__field">
              <label>Параметр 3</label>
              <Select
                value={getValue(form.param3, param3Options)}
                options={param3Options.map((v) => ({ label: v, value: v }))}
                onChange={(v) => update("param3", v)}
              />
            </div>
            <div className="edit__field">
              <label>Параметр 4</label>
              <Input
                placeholder="Введите"
                value={form.param4}
                onChange={(e) => update("param4", e.target.value)}
              />
            </div>
          </div>

          <div className="edit__max">
            <Checkbox
              disabled={form.maxPass === ""}
              checked={form.maxPassCheck}
              onChange={(e) => update("maxPassCheck", e.target.checked)}
            >
              Максимальный проход
            </Checkbox>
            <Input
              value={form.maxPass}
              disabled={!form.showInList}
              onChange={(e) => update("maxPass", e.target.value)}
            />
          </div>

          <div className="edit__footer">
            <Button className="edit__button" onClick={() => setOpenModal(true)}>
              Отменить
            </Button>
            <Button type="primary" disabled={!valid} onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>

        <ModalStyled
          title="Несохранённые изменения"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          className="modal__small"
          footer={[
            <Button
              className="modal__cancel"
              onClick={handleCancel}
            >
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
    </MaterialsDetailEditStyled>
  );
};

export default MaterialsDetailEdit;
