import styled from "styled-components";

export const UserFormStyled = styled.div`
  .ant-checkbox-group {
    flex-direction: column !important;
  }
  .checkbox-wrapper {
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
  }
  .add-btn {
    width: 162px;
  }
  .ant-table-row-selected {
    background-color: red !important;
  }
  .ant-input:focus::placeholder{
    color: transparent !important;
  }
  .form-btns {
    display: flex;
    justify-content: end;
    gap: 12px;
    button {
      width: 49%;
      padding: 0;
    }
  }
`;
