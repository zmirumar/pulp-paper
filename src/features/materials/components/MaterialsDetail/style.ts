import styled from "styled-components";

export const MaterialsDetailStyled = styled.div`
  .materialsDetail {
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 24px;
    }
  }

  .detail__text {
    font-size: 14px;
    color: #8c8c8c;
    margin-bottom: 24px;
    margin-top: 10px;

    span {
      color: #000;
    }
  }

  .materialsDetail__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    .ant-input:focus::placeholder {
      color: transparent !important;
    }

    .detail__input {
      width: 364px;
      padding: 7px;
      border: 1px solid #d9d9d9 !important;
      border-radius: 10px;
    }

    .materialsDetail__button {
      width: 162px;
      height: 32px;
      color: #fff;
      background-color: #1890ff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #40a9ff;
        color: #fff;
      }
    }
  }

  .not-found {
    text-align: center;
    margin-top: 50px;

    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #555;
    }
  }
`;
