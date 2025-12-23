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

export const UserFormStyledBtns = styled.div`
  position: relative;
  padding: 4px 0;
  &::before {
    content: "";
    position: absolute;
    height: 1px;
    background-color: #f0f0f0;
    width: 100%;
    z-index: 5;
    bottom: 47px;
  }
  display: flex;
  justify-content: end;
  gap: 12px;
  button {
    width: 49%;
    padding: 0;
  }
`;
