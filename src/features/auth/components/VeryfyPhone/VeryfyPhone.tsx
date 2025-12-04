import { Form, Input, Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { VeryfyStyles } from "./style";

const VerifyPhone = () => {
  const [form] = Form.useForm();

  return (
<VeryfyStyles>
    <div className="Veryfy">
      <div className="Veryfy_center">
         <h2>Подтвердить номер телефона</h2> 

        <p style={{ color: "#8C8C8C" }}>
          введите код, отправленный на ваш номер телефона
        </p>

        <Form>
          <div className="veryfy_boxes">
            <Input className="veryfy_box"  />
            <Input className="veryfy_box" />
            <Input className="veryfy_box" />
            <Input className="veryfy_box" />
          </div>

  
          <p style={{ display: "block", marginTop: 16, color: "#8C8C8C" }}>
            Отправить новый код в 00:23
          </p>

          <div
          >
            <Button
              type="link"
              icon={<LeftOutlined />}
              style={{ paddingLeft: 0 }}
            >
              Вернуться назад
            </Button>

            <Button type="primary" disabled style={{ width: 160, height: 40 }}>
              Подтвердить
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </VeryfyStyles>
  );
};

export default VerifyPhone;
