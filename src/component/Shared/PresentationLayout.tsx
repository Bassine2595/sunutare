import React from "react";
import { Layout } from "antd";
import styles from "./Less/Presentation.module.less";
import { Footer } from "./Footer";

const { Header, Content } = Layout;

export const PresentationLayout = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo} />
      </Header>
      <Content className={styles.container}>{children}</Content>
      <Footer />
    </Layout>
  );
};
