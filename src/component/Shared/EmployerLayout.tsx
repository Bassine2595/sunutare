import React from "react";
import { Layout, Menu, Tooltip, Row, Col } from "antd";
import styles from "./Less/Employer.module.less";
import {
  ScissorOutlined,
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  HistoryOutlined,
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
      <Menu.Item key="/employer/service">
        <Tooltip title="Service">
          <ScissorOutlined />
        </Tooltip>
        {!isMd && <span>Service</span>}
      </Menu.Item>
      <Menu.Item key="/employer/historique">
        <Tooltip title="Service">
          <HistoryOutlined />
        </Tooltip>
        {!isMd && <span>Historique</span>}
      </Menu.Item>
      <Menu.SubMenu
        title={
          <span>
            <UserOutlined />
          </span>
        }
      >
        <Menu.Item key="employer/profil">
          <Tooltip title="Mon profil">
            <InfoCircleOutlined />
          </Tooltip>
          {!isMd && <span>Mon profil</span>}
        </Menu.Item>
        <Menu.Item key="employer/logout">
          <Tooltip title="Se déconnecter">
            <LogoutOutlined />
          </Tooltip>
          {!isMd && <span>Se déconnecter</span>}
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};
export const EmployerLayout = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo} />
        <Row justify="end">
          <Col>
            <Nav />
          </Col>
        </Row>
      </Header>
      <Content className={styles.container}>{children}</Content>
      <Footer />
    </Layout>
  );
};
