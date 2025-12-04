import styled from "styled-components";
import { Modal } from "antd";

export const MaterialsDetailEditStyled = styled.div`
  .edit__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  hr {
    height: 1px;
    border: 1px solid #d9d9d9;
    margin-bottom: 44px;
  }

  .edit__breadcrumb {
    color: #8c8c8c;
    margin-bottom: 24px;
    margin-top: 15px;

    span {
      color: #000;
    }
  }

  .edit__card {
    background: #fff;
    padding: 24px;
    border-radius: 12px;
  }

  .edit__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 24px;
    margin-bottom: 44px;
  }

  .edit__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .edit__field input,
  .edit__field .ant-select {
    width: 100%;
    height: 40px;
  }

  .edit__checkbox {
    margin-bottom: 24px;
  }

  .edit__max {
    margin-top: 12px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    input {
      width: 360px;
      background-color: #0000000a;
    }
  }

  .edit__footer {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .edit__button {
      height: 35px;
      padding: 0 22px;
      border-radius: 8px;
      font-size: 14px;

      &:hover {
        background-color: #fff;
        color: #1677ff;
        border: 1px solid #d9d9d9;
      }
    }
  }
`;

export const ModalStyled = styled(Modal)`
  top: 50% !important;
  transform: translateY(-50%);

  .modal__continue {
    background-color: var(--color-primary);
    color: #fff;
    border: 1px solid #fff;
    width: 119px;
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
    width: 100px;
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
