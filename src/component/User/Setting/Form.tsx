import React from "react";
import { Form, ConfigProvider } from "antd";
import { validateMessages } from "../../../Message";
import {
  FormItemFullName,
  FormItemPhone,
  FormItemMail,
  FormItemPassword,
} from "../../Shared/Input";
import { ButtonEdit } from "../../Shared/Button";

export const ProfilForm = ({ loading, onFinish, initialValues }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="profil"
        size="large"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <FormItemFullName />
        <FormItemPhone />
        <FormItemMail />
        <ButtonEdit type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};

export const PasswordForm = ({ loading, onFinish }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form name="password" size="large" onFinish={onFinish}>
        <FormItemPassword />
        <FormItemPassword confirm />
        <ButtonEdit type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};
