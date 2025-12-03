import { Input, Select, Checkbox, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialsDetailCreateStyled } from "./style";

const MaterialsDetailCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <MaterialsDetailCreateStyled>
      <div>
        <h1 className="create__title">Добавить новый</h1>

        <p className="create__breadcrumb">
          Разделы / Тип материалов / Добавить новый
        </p>

        <div className="create__card">
          <div className="create__grid">
            <div className="create__field">
              <label className="create__label">Наименование</label>
              <Input />
            </div>

            <div className="create__field">
              <label className="create__label">Код</label>
              <Input />
            </div>

            <div className="create__field">
              <label className="create__label">Ед. изм</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "Кг", value: "Кг" },
                  { label: "Мл.гр", value: "Мл.гр" },
                  { label: "Шт", value: "Шт" },
                ]}
              />
            </div>

            <div className="create__field">
              <label className="create__label">Тип материалов</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "Салфетка B-1", value: "Салфетка B-1" },
                  { label: "Химикаты", value: "Химикаты" },
                ]}
              />
            </div>

            <div className="create__field">
              <label className="create__label">Порядок</label>
              <Input placeholder="0" />
            </div>

            <div className="create__field">
              <label className="create__label">Тара</label>
              <Select
                placeholder="Выберите"
                options={[
                  { label: "118", value: "118" },
                  { label: "120", value: "120" },
                ]}
              />
            </div>

            <div className="create__field">
              <label className="create__label">Код товара</label>
              <Input placeholder="Введите" />
            </div>

            <div className="create__field">
              <label className="create__label">Склад</label>
              <Select
                placeholder="Склад"
                options={[
                  { label: "Склад", value: "Склад" },
                  { label: "Склад сырья", value: "Склад сырья" },
                ]}
              />
            </div>
          </div>

          <hr />

          <div className="create__checkbox">
            <Checkbox>Показать в списке</Checkbox>
          </div>

          <div className="create__grid">
            <div className="create__field">
              <label className="create__label">Параметр 1</label>
              <Select
                placeholder="14гр/м2"
                options={[
                  { label: "14гр/м2", value: "14гр/м2" },
                  { label: "15гр/м2", value: "15гр/м2" },
                ]}
              />
            </div>

            <div className="create__field">
              <label className="create__label">Параметр 2</label>
              <Select
                placeholder="820мм"
                options={[
                  { label: "820мм", value: "820мм" },
                  { label: "700мм", value: "700мм" },
                ]}
              />
            </div>

            <div className="create__field">
              <label className="create__label">Параметр 3</label>
              <Select
                placeholder="1"
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                ]}
              />
            </div>

            <div className="create__field">
              <label className="create__label">Параметр 4</label>
              <Input placeholder="FNNOCREPE B 15" />
            </div>
          </div>

          <div className="create__max">
            <Checkbox>Максимальный проход</Checkbox>
            <Input placeholder="0" />
          </div>

          <div className="create__footer">
            <Button onClick={() => navigate(`/materialspage/${id}`)}>
              Отменить
            </Button>
            <Button type="primary">Добавить</Button>
          </div>
        </div>
      </div>
    </MaterialsDetailCreateStyled>
  );
};

export default MaterialsDetailCreate;
