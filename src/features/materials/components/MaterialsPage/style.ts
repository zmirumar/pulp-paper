import { Modal } from "antd";
import styled from "styled-components";

export const MaterialsStyled = styled.div`
  .materials {
    display: flex;
    flex-direction: column;
  }

  .materials__site {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .materials__input {
      width: 364px;
      padding: 7px;
      border: 1px solid #d9d9d9 !important;
      border-radius: 10px;
    }

    button {
      width: 240px;
      height: 32px;
      color: var(--white);
      background-color: var(--color-primary);
      border: none;
      cursor: pointer;

      &:hover {
        background-color: var(--color-primary) !important;
        color: var(--white) !important;
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

  .modal__text {
    width: 80%;
  }
  .modal__cancel {
    margin-right: 8px;
    border-radius: 8px;
    padding: 10px 15px;
    color: #000000e0;
    background-color: #fff;
    border: 1px solid #d9d9d9 !important;
    &:hover {
      background-color: #fff !important;
      color: #000000e0 !important;
      border: 1px solid #d9d9d9 !important;
    }
  }
`;
