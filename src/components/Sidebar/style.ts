import styled from "styled-components";
import { Layout } from "antd";

const { Sider } = Layout;

export const SideBarStyled = styled(Sider)`
  background-color: #ffffff;

  & .items {
    padding: 20px 10px 0 10px;
    width: 267px;
    height: 100vh;
    background-color: #ffffff;
    position: relative;
  }

  & .settings_section {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  & header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 30px 0 24px 16px;

    & h1 {
      font-size: 18px;
      color: #00a6fb;
      white-space: nowrap;
    }
  }

  .menu-icon {
    width: 16px;
    height: 16px;
  }

  .ant-menu-item:hover > .menu-icon,
  .ant-menu-submenu-title:hover .menu-icon {
    filter: invert(39%) sepia(94%) saturate(3000%) hue-rotate(205deg)
      brightness(95%) contrast(101%);
  }

  .ant-menu-title-content:hover {
    color: #1677ff !important;
  }

  .ant-menu-item-selected .ant-menu-title-content,
  .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-title-content {
    color: #1677ff !important;
  }

  .ant-menu-item-selected .menu-icon,
  .ant-menu-submenu-selected > .ant-menu-submenu-title .menu-icon {
    filter: invert(39%) sepia(94%) saturate(3000%) hue-rotate(205deg)
      brightness(95%) contrast(101%);
  }

  .ant-menu-submenu .ant-menu {
    background: #ffffff !important;
  }

  .no-padding-item {
    padding-left: 0 !important;
  }
  
  .ant-menu {
    border: none !important;
  }
`;
