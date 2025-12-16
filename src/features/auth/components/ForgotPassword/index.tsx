import React from "react";
import { Form, Input, Button  } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PasswordStyles } from "./style";


const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Phone:", values.phone);
  };


  return (
    <PasswordStyles>
      <div className="password">
        
          <h3 className="password_title">
           Забыли пароль
          </h3>
       
         <p className="password_text">Введите номер телефона, который вы использовали для регистрации в системе.
          Мы отправим вам одноразовый пароль.</p>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Введите номер телефона" }]}
          >
            <Input
              placeholder="Phone number"
               size="large"
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
              >
                Подтвердить
              </Button>
            )}
          </Form.Item>
        </Form>

        <div  className="pasword__btn">
          <ArrowLeftOutlined/>
          <Link to='/auth'>
            <button>
          Вернуться назад
          </button>
          </Link>
        
        </div>
      </div>
      </PasswordStyles>
  );
};

export default ForgotPassword;
