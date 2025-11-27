import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LoginStyled } from "./style";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  
  const handleChange = () => {
    const { login, password } = form.getFieldsValue();
    setIsDisabled(!(login?.trim() && password?.trim()));
  };
  
  const onFinish = (values: any) => {   
    console.log(values);
  };
  
  return (
    <LoginStyled>
    <div className="login">
    <Title level={2}>Вход</Title>
    
    <Form
    form={form}
    layout="vertical"
    onValuesChange={handleChange}
    onFinish={onFinish}
    >
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
    
    <Link to="/auth/password">Forgot password?</Link>
    </div>
    
    <Button
    htmlType="submit"
    size="large"
    block
    disabled={isDisabled}
    className="login__btn"
    >
    Войти
    </Button>
    </Form>
    </div>
    </LoginStyled>
  );
};

export default LoginPage;
