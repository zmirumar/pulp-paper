import styled from "styled-components";

export const StyledTable = styled.div`
  .parameter {
    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        padding-bottom: 12px;
        border-bottom: 1px solid silver;
      }
    }

    &_add {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 8px 16px !important;
      cursor: pointer;
      border: none;
      border-radius: 10px;
    }

    &_modal {
      z-index: 1000;
    }

    &_actions {
      display: flex;
      justify-content: end;
      gap: 13px;
    }
  }

  .table_features {
    color: #00000073;
    &:hover {
      color: #00000073 !important;
    }
  }

  // ANTD STYLES
  .ant-table-tbody {
    cursor: pointer;
  }
  .ant-table-tbody > tr:hover > td {
    background: transparent !important;
  }
  .ant-btn {
    padding: 0px;
  }
`;
