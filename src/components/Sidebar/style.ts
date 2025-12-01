import styled from "styled-components";
import { Layout } from "antd";

const { Sider } = Layout;

export const SideBarStyled = styled(Sider)`
  flex: unset !important;
  max-width: unset !important;
  min-width: unset !important;
  width: auto !important;

  .sidebar {
    background-color: #fff;
    box-shadow: 1px 0 8px #00000026;
    width: 276px;
    height: 100%;
    padding: 30px 16px;

    &__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;

      h1 {
        font-size: 18px;
        color: #00a6fb;
        white-space: nowrap;
      }
    }

    &__setting {
      position: absolute;
      bottom: 30px;
      width: 244px;
      border-top: 1.5px solid #e2dadaff;
    }
  }

  /* ANTD STYLES */
  .menu-icon {
    width: 16px;
    height: 16px;
  }

  .ant-menu {
    border: none !important;
  }

  .ant-menu-item-only-child {
    padding: 0 !important;
  }

  .ant-menu-title-content {
    padding-left: 8px;
  }

  .ant-menu-submenu-arrow {
    width: 9px;
    height: 6px;
  }

  .ant-menu-submenu-title:hover .ant-menu-submenu-arrow {
    color: #1677ff !important;
    filter: invert(39%) sepia(94%) saturate(3000%) hue-rotate(205deg)
      brightness(95%) contrast(101%);
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    background: #e6f4ff !important;
  }

  .ant-menu-item:hover .menu-icon,
  .ant-menu-submenu-title:hover .menu-icon,
  .ant-menu-item:hover .ant-menu-title-content,
  .ant-menu-submenu-title:hover .ant-menu-title-content {
    color: #1677ff !important;
    filter: invert(39%) sepia(94%) saturate(3000%) hue-rotate(205deg)
      brightness(95%) contrast(101%);
  }

  .ant-menu-item-selected .menu-icon,
  .ant-menu-submenu-selected > .ant-menu-submenu-title .menu-icon {
    filter: invert(39%) sepia(94%) saturate(3000%) hue-rotate(205deg)
      brightness(95%) contrast(101%);
  }
`;
