import React from "react";
import { Form, Button, ConfigProvider } from "antd";
import { validateMessages } from "../../Message";
import { FormItemMail, FormItemPassword } from "../Shared/Input";

export const MailForm = (props) => {
  const { onFinish, loading } = props;

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        className="mail-form"
        initialValues={{
          remember: true,
        }}
        size="large"
        onFinish={onFinish}
      >
        <FormItemMail />
        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export const PasswordForm = (props) => {
  const { onFinish, loading } = props;

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        className="password-form"
        initialValues={{
          remember: true,
        }}
        size="large"
        onFinish={onFinish}
      >
        <FormItemPassword />
        <FormItemPassword confirm />
        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Réinitialiser
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
