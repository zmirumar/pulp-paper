import { Layout } from "antd";
import styled from "styled-components";
const { Content } = Layout;
export const ContentContainer = styled(Content)`
  min-height: 280px;
  max-height: 93vh;
  overflow-y: scroll;
  & > div {
    padding: 24px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #374045;
    border-radius: 3px;
  }
`;
