import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Result
        status="404"
        title="404"
        subTitle="Kechirasiz, bu sahifa topilmadi."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Bosh sahifaga qaytish
          </Button>
        }
      />
    </NotFoundContainer>
  );
};

export default NotFound;
