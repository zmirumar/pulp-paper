import styled from "styled-components";

export const StyledTable = styled.div`
  .parameters {
    &__title {
      font-size: 24px;
      margin-top: 8px;
      margin-bottom: 28px;
    }
  }

  // ANTD STYLES
  .ant-table-tbody {
    cursor: pointer;
  }
  .ant-table-tbody > tr:hover > td {
    background: transparent !important;
  }
`;
