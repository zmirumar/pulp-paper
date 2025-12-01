import styled from "styled-components";
import { Modal } from "antd";

export const MaterialsDetailStyled = styled.div`
  .materialsDetail {
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 20px;
      cursor: pointer;
    }

    .materialsDetail__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;

      .detial__input {
        max-width: 300px;
        padding: 7px 10px;
        border: 1px solid #00000040;
        border-radius: 10px;
      }

      button {
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

export const ModalStyled = styled(Modal)`
  .modal__delete {
    background-color: var(--color-primary);
    color: #fff;
    border: 1px solid #fff;
    width: 89px;
    &:hover {
      background-color: var(--color-primary) !important;
      color: #fff !important;
      border: 1px solid #fff !important;
    }
  }
  .modal__cancel {
    margin-right: 8px;
    border-radius: 8px;
    padding: 10px 15px;
    color: #000000e0;
    background-color: #fff;
    border: 1px solid #393939ff;
    &:hover {
      background-color: #fff !important;
      color: #000000e0 !important;
      border: 1px solid #393939ff !important;
    }
  }
`;
