import styled from "styled-components";

export const UserPageStyled = styled.div`
  .userpage {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &__header_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__title {
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;
    }
    &__search_input {
      width: 364px !important;
      font-size: 14px;
      border-color: #d9d9d9;
      border-radius: 6px;
      &:hover {
        border: 1px solid #1677ff !important;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
      }
      .ant-input-affix-wrapper-focused {
        box-shadow: none !important;
      }
    }
    &__create_btn {
      background-color: #1677ff;
      padding: 5px 16px;
      font-size: 14px;
      &:hover {
        background-color: #4096ff;
      }
      span {
        height: 22px;
      }
    }

    // table styles
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
  }
`;
