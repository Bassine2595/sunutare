import React, { useState } from "react";
import { Layout, Menu, Button, Row, Col, Affix } from "antd";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Auth } from "../../Service";
import {
  LogoutOutlined,
  SkinOutlined,
  UsergroupAddOutlined,
  SettingFilled,
  DashboardOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  FileImageOutlined,
  MenuOutlined,
  CloseOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Footer } from "./Footer";
import { logoutConfirm } from "./Confirm";
import { Notification } from "./Notification";
import { useMediaQuery } from "react-responsive";
import { FollowModal } from "./Modal/Follow";
import { ShowModal } from "./Modal/Show";
import { EditModal } from "./Modal/Edit";
import { useSelector } from "react-redux";
import { ReducerType } from "../../reducers/Reducer";
import { DeliverModal } from "./Modal/Deliver";
const { Content, Sider, Header } = Layout;

const Nav = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const logout = () => {
    logoutConfirm({
      onCancel: null,
      onOk: () => {
        Auth.logout(() => {
          history.push({ pathname: "/" });
        });
      },
    });
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[pathname]}
      onClick={({ key }) => {
        if (key === "logout") {
          logout();
        } else {
          history.push(key);
        }
      }}
    >
      <Menu.Item key="/dash">
        <DashboardOutlined />
        <span>Tableau de bord</span>
      </Menu.Item>
      <Menu.Item key="/service">
        <UnorderedListOutlined />
        <span>Mes services</span>
      </Menu.Item>
      <Menu.Item key="/modele">
        <SkinOutlined />
        <span>Mes modeles</span>
      </Menu.Item>
      <Menu.Item key="/employer">
        <UsergroupAddOutlined />
        <span>Mes employés</span>
      </Menu.Item>
      <Menu.Item key="/customer">
        <ContactsOutlined />
        <span>Mes clients</span>
      </Menu.Item>
      <Menu.Item key="/setting">
        <SettingFilled />
        <span>Configuration</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>Se déconnecter</span>
      </Menu.Item>
    </Menu>
  );
};

export const Theme = (props) => {
  const isMd = useMediaQuery({ query: "(max-width: 768px)" });
  const isSm = useMediaQuery({ query: "(max-width: 576px)" });
  const { service } = useSelector(
    ({ serviceModal }: ReducerType) => serviceModal
  );
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const { children } = props;

  return (
    <Layout>
      {(!isSm || collapsed) && (
        <Sider
          collapsed={isMd}
          style={{
            zIndex: 2,
            marginTop: 64,
            position: "fixed",
            height: "100%",
          }}
        >
          <Nav />
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 2,
          }}
        >
          <Row justify="end">
            <Col>
              <Button
                href="/service/add"
                icon={<PlusCircleOutlined />}
                shape="round"
                type="primary"
              >
                {!isMd && "Prendre un service"}
              </Button>
              <Notification />
            </Col>
          </Row>
        </Header>
        <Content
          key="content"
          style={{
            minHeight: "77vh",
            margin: isSm
              ? "100px 0px 0px 0px"
              : isMd
              ? "100px 0px 0 100px"
              : "100px 20px 0 250px",
          }}
        >
          {children}
          {isSm && (
            <Affix
              style={{
                position: "fixed",
                top: "50vh",
                left: collapsed ? 80 : 0,
                zIndex: 2,
              }}
            >
              <Button
                type={!collapsed ? "primary" : "danger"}
                icon={!collapsed ? <MenuOutlined /> : <CloseOutlined />}
                onClick={() => setCollapsed((collapsed) => !collapsed)}
              />
            </Affix>
          )}
          <Affix
            style={{ position: "fixed", bottom: 20, right: 30, zIndex: 2 }}
          >
            <Button
              shape="round"
              type="primary"
              icon={<FileImageOutlined />}
              onClick={() => history.push("/galerie")}
            >
              {!isMd && "Je consulte ma galerie"}
            </Button>
          </Affix>
        </Content>
        <Footer />
      </Layout>
      {service && <FollowModal />}
      {service && <ShowModal />}
      {service && <EditModal />}
      {service && <DeliverModal />}
    </Layout>
  );
};
