import styled from "styled-components";

export const MaterialsDetailCreateStyled = styled.div`
  .create__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  hr {
    height: 1px;
    border: 1px solid #d9d9d9;
  }

  .create__breadcrumb {
    color: #8c8c8c;
    margin-bottom: 24px;
    margin-top: 15px;
  }

  .create__card {
    background: #fff;
    padding: 24px;
    border-radius: 12px;
  }

  .create__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 24px;
    margin-bottom: 24px;
  }

  .create__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .create__label {
    color: #555;
    font-size: 14px;
  }

  .create__field input,
  .create__field .ant-select {
    width: 100%;
    height: 40px;
  }

  .create__checkbox {
    margin-bottom: 24px;
  }

  .create__max {
    margin-top: 12px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    input {
      width: 360px;
      background-color: #d9d9d9;
    }
  }

  .create__footer {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    button {
      height: 40px;
      padding: 0 22px;
      border-radius: 8px;
      font-size: 14px;
    }
  }

  .ant-btn-primary {
    background-color: #1677ff;
    border-color: #1677ff;
  }

  .ant-btn-primary:hover {
    background-color: #3a8bff !important;
    border-color: #3a8bff !important;
  }
`;
