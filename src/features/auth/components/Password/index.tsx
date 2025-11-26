import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PasswordStyles } from "./style";

const {  Text } = Typography;

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Phone:", values.phone);
  };

  const navigate = useNavigate();

  return (
    <PasswordStyles>
      <div className="password">
          <h3>
           Забыли пароль
          </h3>
       

        <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
          Введите номер телефона, который вы использовали для регистрации в системе.
          Мы отправим вам одноразовый пароль.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 25 }}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Введите номер телефона" }]}
          >
            <Input
              placeholder="Phone number"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
                style={{ borderRadius: 8 }}
              >
                Подтвердить
              </Button>
            )}
          </Form.Item>
        </Form>

        <div  className="pasword__btn">
          <ArrowLeftOutlined style={{ fontSize: 12 }} />
          <button onClick={() => navigate('/auth') }>
          Вернуться назад
          </button>
        </div>
      </div>
      </PasswordStyles>
  );
};

export default ForgotPassword;
