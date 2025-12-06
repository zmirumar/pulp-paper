import styled from "styled-components";

export const UserTableStyled = styled.div`
  .ant-pagination {
    display: flex;
    justify-content: center !important;
    background-color: #00000005;
    padding: 16px 0px;
    margin: 0 !important;
    &-item {
      background-color: transparent;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      border: none;
      font-size: 14px;
      padding: 12px 8px;
      font-weight: 600;
      border-radius: 0 !important;
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-size: 14px;
      padding: 12px 8px;
      line-height: 22px;
    }
  }

  .user-action-btns-wrapper {
    display: flex;
    gap: 8px;
    justify-content: end;
    .user-action-btn {
      width: 14px;
      height: 14.5px;
    }
    .ant-btn-icon-only {
      width: 24px !important;
      height: 24px !important;
    }
  }
`;
