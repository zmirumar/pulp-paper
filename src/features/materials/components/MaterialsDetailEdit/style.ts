import styled from "styled-components";

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

  .ant-input:focus::placeholder {
    color: transparent !important;
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
