import { useState, useEffect } from "react";
import {
  Input,
  Select,
  Checkbox,
  Button,
  notification,
  Modal,
  Form,
} from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MaterialsDetailEditStyled } from "./style";
import { CheckCircleFilled } from "@ant-design/icons";
import "@/styles/drawer.css";

const MaterialsDetailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [, forceUpdate] = useState({});
  const [isTopChecked, setIsTopChecked] = useState(false);
  const [isMaxChecked, setIsMaxChecked] = useState(false);
  const [maxPassValue, setMaxPassValue] = useState("");

  const location = useLocation();
  const record = location.state;

  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    if (record) {
      const initVals = {
        name: record.name,
        code: record.code,
        unit: record.unit,
        type: record.type,
        order: record.order,
        productCode: record.code,
        sklad: record.section,
        param1: record.materialKind,
        param2: record.param2 || "",
        param3: record.param3 || "",
        param4: record.param4 || "",
        tara: record.tara || "",
        maxPass: false,
        maxPassValue: "",
      };
      form.setFieldsValue(initVals);
      setInitialValues(initVals);
    }
  }, [record, form]);

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

  const isFormTouched = form.isFieldsTouched(true);
  const isSubmitEnabled =
    isTopChecked && isMaxChecked && maxPassValue && isFormTouched;

  const handleCancel = () => {
    const currentValues = form.getFieldsValue();
    const hasChanges = Object.keys(initialValues).some(
      (key) => currentValues[key] !== initialValues[key]
    );

    if (hasChanges) {
      setOpenModal(true);
    } else {
      navigate(`/refs/material-types/${id}`);
    }
  };

  const handleFinsh = () => {
    notification.success({
      message: "Изменения сохранены",
      description: "Ваши изменения были успешно применены",
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
          <Form
            onValuesChange={() => forceUpdate({})}
            form={form}
            onFinish={handleFinsh}
          >
            <div className="edit__grid">
              <Form.Item
                name="name"
                label="Наименование"
                className="edit__field"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item
                name="code"
                label="Код"
                className="edit__field"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item
                name="unit"
                label="Ед. изм"
                className="edit__failed"
                labelCol={{ span: 24 }}
              >
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
                className="edit__field"
                labelCol={{ span: 24 }}
              >
                <Select
                  options={[
                    { value: "Салфетка B-1", label: "Салфетка B-1" },
                    { value: "Химикаты", label: "Химикаты" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="order"
                label="Порядок"
                className="edit__field"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item
                name="tara"
                label="Тара"
                className="edit__field"
                labelCol={{ span: 24 }}
              >
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
                className="edit__field"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>

              <Form.Item
                name="sklad"
                label="Склад"
                className="edit__field"
                labelCol={{ span: 24 }}
              >
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

            <div className="edit__grid">
              <Form.Item
                name="param1"
                label="Параметр 1"
                className="edit__field"
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
                className="edit__field"
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
                className="edit__field"
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
                className="edit__field"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Введите" />
              </Form.Item>
            </div>

            <Form.Item
              name="maxPass"
              valuePropName="checked"
              className="edit__checkbox"
            >
              <Checkbox
                checked={isMaxChecked}
                onChange={(e) => setIsMaxChecked(e.target.checked)}
                disabled={!isTopChecked}
              >
                Максимальный проход
              </Checkbox>
            </Form.Item>

            <Form.Item name="maxPassValue" className="edit__input">
              <Input
                value={maxPassValue}
                onChange={(e) => setMaxPassValue(e.target.value)}
                disabled={!isTopChecked}
                placeholder="0"
              />
            </Form.Item>

            <Form.Item>
              <div className="edit__footer">
                <Button className="edit__button" onClick={handleCancel}>
                  Отменить
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isSubmitEnabled}
                >
                  Сохранить
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
            navigate("/refs/material-types/${id}");
          }}
          okText="Продолжить"
          cancelText="Отменить"
          className="modal__small"
        >
          <p className="modal__text" style={{ width: "80%" }}>
            Все несохранённые изменения будут потеряны. Продолжить?
          </p>
        </Modal>
      </div>
    </MaterialsDetailEditStyled>
  );
};

export default MaterialsDetailEdit;
