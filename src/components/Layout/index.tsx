import { useState } from "react";
import { Layout } from "antd";
import { ContentContainer } from "./style";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sidebar collapsed={collapsed} toggleCollapse={() => setCollapsed((prev) => !prev)}/> */}
      <Layout>
        <ContentContainer>{children}</ContentContainer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;