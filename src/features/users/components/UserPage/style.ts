import styled from "styled-components";

export const UserPageStyled = styled.div`
  .user-page {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &-header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title {
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
      }
      .search-input {
        width: 364px !important;
        font-size: 14px;
        border-color: #d9d9d9;
        border-radius: 6px;
      }
      .search-input:hover {
        border: 1px solid #1677ff !important;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
      }
      .ant-input-affix-wrapper-focused {
        box-shadow: none !important;
      }
      .create-btn {
        background-color: #1677ff;
        padding: 5px 16px;
        font-size: 14px;
        &:hover {
          background-color: #4096ff;
        }
      }
    }
  }
`;
