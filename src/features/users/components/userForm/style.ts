import { Drawer } from "antd";
import styled from "styled-components";

export const UserFormStyled = styled(Drawer)`
  .ant-checkbox-group {
    flex-direction: column !important;
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
      width: 159px;
      padding: 0;
    }
  }
`;
