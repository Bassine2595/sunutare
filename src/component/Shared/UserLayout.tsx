import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import styles from "./Less/UserLayout.module.less";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import logo from "../../logo.svg";

export const UserLayout = (props) => {
  const { children, title } = props;
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {<img alt="logo" className={styles.logo} src={logo} />}
                <span className={styles.title}>
                  {process.env.REACT_APP_NAME}
                </span>
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
};
