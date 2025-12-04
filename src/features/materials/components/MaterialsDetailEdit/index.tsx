import { Input, Select, Checkbox, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialsDetailEditStyled, ModalStyled } from "./style";
import { useState } from "react";

const MaterialsDetailCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openModal, SetopenModal] = useState(false);

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
              <Input placeholder="Введите" />
            </div>

            <div className="edit__field">
              <label>Код</label>
              <Input placeholder="Введите" />
            </div>

            <div className="edit__field">
              <label>Ед. изм</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "Кг", value: "Кг" },
                  { label: "Мл.гр", value: "Мл.гр" },
                  { label: "Шт", value: "Шт" },
                ]}
              />
            </div>

            <div className="edit__field">
              <label>Тип материалов</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "Салфетка B-1", value: "Салфетка B-1" },
                  { label: "Химикаты", value: "Химикаты" },
                ]}
              />
            </div>

            <div className="edit__field">
              <label>Порядок</label>
              <Input placeholder="Введите" />
            </div>

            <div className="edit__field">
              <label>Тара</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "118", value: "118" },
                  { label: "120", value: "120" },
                ]}
              />
            </div>

            <div className="edit__field">
              <label>Код товара</label>
              <Input placeholder="Введите" />
            </div>

            <div className="edit__field">
              <label>Склад</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "Склад", value: "Склад" },
                  { label: "Склад сырья", value: "Склад сырья" },
                ]}
              />
            </div>
          </div>

          <hr />

          <Checkbox className="edit__checkbox">Показать в списке</Checkbox>

          <div className="edit__grid">
            <div className="edit__field">
              <label>Параметр 1</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "14гр/м2", value: "14гр/м2" },
                  { label: "15гр/м2", value: "15гр/м2" },
                ]}
              />
            </div>

            <div className="edit__field">
              <label>Параметр 2</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "820мм", value: "820мм" },
                  { label: "700мм", value: "700мм" },
                ]}
              />
            </div>

            <div className="edit__field">
              <label>Параметр 3</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                ]}
              />
            </div>

            <div className="edit__field">
              <label>Параметр 4</label>
              <Input placeholder="Введите" />
            </div>
          </div>

          <div className="edit__max">
            <Checkbox>Максимальный проход</Checkbox>
            <Input placeholder="0" />
          </div>

          <div className="edit__footer">
            <Button className="edit__button" onClick={() => SetopenModal(true)}>
              Отменить
            </Button>
            <Button
              onClick={() => navigate(`/materialspage/${id}`)}
              type="primary"
            >
              Сохранить
            </Button>
          </div>
        </div>

        <ModalStyled
          title="Несохранённые изменения"
          open={openModal}
          onCancel={() => SetopenModal(false)}
          className="modal__small"
          footer={[
            <Button
              className="modal__cancel"
              onClick={() => navigate(`/materialspage/${id}`)}
            >
              Отменить
            </Button>,
            <Button className="modal__continue">Продолжить</Button>,
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

export default MaterialsDetailCreate;
