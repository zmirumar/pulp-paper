import { Form, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { VerifyStyles } from "./style";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const VerifyPhone = () => {

  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      inputsRef.current[index - 1]?.focus();
  };

  const updateCode = (value: string, index: number) => {
    const cleaned = value.replace(/\D/g, "");

    const newCode = code.map((v, i) => (i === index ? cleaned : v));
    setCode(newCode);

    if (cleaned && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const isFilled = code.every(Boolean);

  const onFinish = () => {
    const finalCode = code.join("");
    console.log("Kiritilgan kod:", finalCode);
  };

  return (
    <VerifyStyles>
      <div className="verify">
        <div className="verify__center">
          <h2>Подтвердить номер телефона</h2>

          <p className="verify__paragraph">
            введите код, отправленный на ваш номер телефона
          </p>

          <Form onFinish={onFinish}>
            <div className="verify__boxes">
              {code.map((val, i) => (
                <input
                  key={i}
                  className="verify__box"
                  maxLength={1}
                  value={val}
                  ref={(el: HTMLInputElement | null) => {
                    inputsRef.current[i] = el;
                  }}
                  onChange={(e) => updateCode(e.target.value, i)}
                  onKeyDown={(e) => handleKey(e, i)}
                  inputMode="numeric"
                />
              ))}
            </div>

            <p style={{ marginTop: 16, color: "#8C8C8C" }}>
              Отправить новый код в 00:23
            </p>

            <div className="verify__next">
              <Link to="/auth">
                <LeftOutlined />
                Вернуться назад
              </Link>

              <Button
                type="primary"
                className="verify__confirm"
                htmlType="submit"
                disabled={!isFilled}
              >
                Подтвердить
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </VerifyStyles>
  );
};

export default VerifyPhone;
