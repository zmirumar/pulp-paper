import React from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LoginStyled } from "./style";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <LoginStyled>
      <div className="login">
        <Title level={2}>Вход</Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <Input size="large" placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              iconRender={(v) =>
                v ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="login__remember">
            <Form.Item
              name="remember"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Iltimos, tasdiqlang"),
                },
              ]}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/auth/forgot-password">Forgot password?</Link>
          </div>

          <Form.Item shouldUpdate>
            {() => {
              const login = form.getFieldValue("login");
              const password = form.getFieldValue("password");

              const disabled = !login?.trim() || !password?.trim();

              return (
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  disabled={disabled}
                  className="login__btn"
                >
                  Войти
                </Button>
              );
            }}
          </Form.Item>
        </Form>
      </div>
    </LoginStyled>
  );
};

export default LoginPage;
