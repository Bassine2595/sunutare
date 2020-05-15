import React from "react";
import { Layout, Menu, Tooltip } from "antd";
import styles from "./Less/Customer.module.less";
import {
  HomeOutlined,
  FileImageOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useLocation, useHistory } from "react-router-dom";
import { Footer } from "./Footer";

const { Header, Content } = Layout;

const Nav = () => {
  const isMd = useMediaQuery({ query: "(max-width: 768px)" });
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[pathname]}
      onClick={({ key }) => history.push(key)}
    >
      <Menu.Item key="/">
        <Tooltip title="Accueil">
          <HomeOutlined />
        </Tooltip>
        {!isMd && <span>Accueil</span>}
      </Menu.Item>
      <Menu.Item key="/galerie">
        <Tooltip title="Galerie">
          <FileImageOutlined />
        </Tooltip>
        {!isMd && <span>Galerie</span>}
      </Menu.Item>
      <Menu.Item key="/order">
        <Tooltip title="Mes commandes">
          <ShoppingOutlined />
        </Tooltip>
        {!isMd && <span>Mes commandes</span>}
      </Menu.Item>
    </Menu>
  );
};
export const CustomerLayout = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo} />
        <Nav />
      </Header>
      <Content className={styles.container}>{children}</Content>
      <Footer />
    </Layout>
  );
};
