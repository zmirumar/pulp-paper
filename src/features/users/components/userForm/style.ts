import styled from "styled-components";

export const UserFormStyled = styled.div`
  .ant-checkbox-group {
    flex-direction: column !important;
  }
  .ant-form-item-row {
    border-bottom: 1px solid #f0f0f0;
  }
  .add-btn {
    width: 162px;
  }
  .ant-table-row-selected {
    background-color: red !important;
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
