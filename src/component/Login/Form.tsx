import React from "react";
import { Form, ConfigProvider, Divider } from "antd";
import { validateMessages } from "../../Message";
import { Link } from "react-router-dom";
import { FormItemMail, FormItemPassword } from "../Shared/Input";
import { ButtonLogin, ButtonRegister } from "../Shared/Button";

export const LoginForm = (props) => {
  const { onFinish } = props;
  const { loading } = props;
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form onFinish={onFinish}>
        <FormItemMail />
        <FormItemPassword />
        <Form.Item>
          <Link style={{ float: "right" }} to="/forget-password">
            Mot de passe oublié
          </Link>
        </Form.Item>
        <ButtonLogin block htmlType="submit" loading={loading} />
        <Divider>Ou</Divider>
        <ButtonRegister block href="/register" />
      </Form>
    </ConfigProvider>
  );
};
