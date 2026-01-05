import { useState } from "react";
import {
  Input,
  Select,
  Checkbox,
  Button,
  notification,
  Modal,
  Form,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialsDetailCreateStyled } from "./style";
import { CheckCircleFilled } from "@ant-design/icons";
import "@/styles/drawer.css";

const MaterialsDetailCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [, forceUpdate] = useState({});
  const [isTopChecked, setIsTopChecked] = useState(false);
  const [isMaxChecked, setIsMaxChecked] = useState(false);
  const [maxPassValue, setMaxPassValue] = useState("");

  const isFormFilled = () => {
    const values = form.getFieldsValue();
    return (
      Boolean(values.name) &&
      Boolean(values.code) &&
      Boolean(values.unit) &&
      Boolean(values.type) &&
      Boolean(values.order) &&
      Boolean(values.tara) &&
      Boolean(values.productCode) &&
      Boolean(values.sklad) &&
      Boolean(values.param1) &&
      Boolean(values.param2) &&
      Boolean(values.param3) &&
      Boolean(values.param4)
    );
  };

  const isSubmitEnabled = isTopChecked && isMaxChecked && maxPassValue;

  const handleSubmit = () => {
    notification.success({
      message: "Товар добавлен",
      description: "Новый товар успешно добавлен в список",
      placement: "topRight",
      icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      duration: 3,
      className: "succes_message",
    });
    navigate(`/refs/material-types/${id}`);
  };

  return (
    <MaterialsDetailCreateStyled>
      <div className="detail__create">
        <h1 className="create__title">Добавить новый</h1>
        <p className="create__breadcrumb">
          Разделы / Тип материалов / <span>Добавить новый</span>
        </p>

        <div className="create__card">
          <Form
            form={form}
            onValuesChange={() => forceUpdate({})}
            onFinish={handleSubmit}
          >
            <div className="create__grid">
              <Form.Item
                name="name"
                label="Наименование"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item name="code" label="Код" labelCol={{ span: 24 }}>
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item name="unit" label="Ед. изм" labelCol={{ span: 24 }}>
                <Select
                  options={[
                    { value: "Кг", label: "Кг" },
                    { value: "Мл.гр", label: "Мл.гр" },
                    { value: "Шт", label: "Шт" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="type"
                label="Тип материалов"
                labelCol={{ span: 24 }}
              >
                <Select
                  options={[
                    { value: "Салфетка B-1", label: "Салфетка B-1" },
                    { value: "Химикаты", label: "Химикаты" },
                  ]}
                />
              </Form.Item>

              <Form.Item name="order" label="Порядок" labelCol={{ span: 24 }}>
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item name="tara" label="Тара" labelCol={{ span: 24 }}>
                <Select
                  options={[
                    { value: "118", label: "118" },
                    { value: "120", label: "120" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="productCode"
                label="Код товара"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item name="sklad" label="Склад" labelCol={{ span: 24 }}>
                <Select
                  options={[
                    { value: "Склад", label: "Склад" },
                    { value: "Склад сырья", label: "Склад сырья" },
                  ]}
                />
              </Form.Item>
            </div>

            <hr />

            <Form.Item shouldUpdate>
              {() => (
                <Checkbox
                  checked={isTopChecked}
                  onChange={(e) => setIsTopChecked(e.target.checked)}
                  disabled={!isFormFilled()}
                >
                  Показать в списке
                </Checkbox>
              )}
            </Form.Item>

            <div className="create__grid">
              <Form.Item
                name="param1"
                label="Параметр 1"
                labelCol={{ span: 24 }}
              >
                <Select
                  options={[
                    { value: "14гр/м2", label: "14гр/м2" },
                    { value: "15гр/м2", label: "15гр/м2" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="param2"
                label="Параметр 2"
                labelCol={{ span: 24 }}
              >
                <Select
                  options={[
                    { value: "820мм", label: "820мм" },
                    { value: "700мм", label: "700мм" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="param3"
                label="Параметр 3"
                labelCol={{ span: 24 }}
              >
                <Select
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="param4"
                label="Параметр 4"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>
            </div>

            <Form.Item name="maxPass" valuePropName="checked">
              <Checkbox
                checked={isMaxChecked}
                onChange={(e) => setIsMaxChecked(e.target.checked)}
                disabled={!isTopChecked}
              >
                Максимальный проход
              </Checkbox>
            </Form.Item>

            <Form.Item className="create__input" name="maxPassValue">
              <Input
                value={maxPassValue}
                onChange={(e) => setMaxPassValue(e.target.value)}
                disabled={!isTopChecked}
                placeholder="0"
              />
            </Form.Item>

            <Form.Item>
              <div className="create__footer">
                <Button
                  className="create__button"
                  onClick={() => {
                    if (form.isFieldsTouched()) {
                      setOpenModal(true);
                    } else {
                      navigate("/refs/material-types/1");
                    }
                  }}
                >
                  Отменить
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isSubmitEnabled}
                >
                  Добавить
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>

        <Modal
          title="Несохранённые изменения"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          centered
          onOk={() => {
            setOpenModal(false);
            navigate("/refs/material-types/1");
          }}
          okText="Продолжить"
          cancelText="Отменить"
        >
          <p style={{ width: "80%" }}>
            Все несохранённые изменения будут потеряны. Продолжить?
          </p>
        </Modal>
      </div>
    </MaterialsDetailCreateStyled>
  );
};

export default MaterialsDetailCreate;
