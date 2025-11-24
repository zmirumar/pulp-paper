import styled from "styled-components";
import { Layout } from "antd";

const { Sider } = Layout;

export const SideBarStyled = styled(Sider)`
  .sidebar {
    background-color: #fff;
    width: 276px;
    height: 100vh;
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

      hr {
        margin: 10px;
        border: 1px solid #e2dadaff;
      }
    }
  }

  /* ANTD OVERRIDES */
  .menu-icon {
    width: 16px;
    height: 16px;
  }

  .ant-menu {
    border: none !important;
    background: #fff !important;
  }

  .ant-menu-item-only-child {
    padding: 0 !important;
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
