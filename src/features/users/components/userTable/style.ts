import styled from "styled-components";
import { Table } from "antd";

export const UserTableStyled = styled(Table)`
  .ant-pagination {
    display: flex;  
    justify-content: center !important;
  }
  .ant-table-thead .ant-table-cell {
    background-color: #F0F0F0;
  }
`;
