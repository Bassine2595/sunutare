import React from "react";
import { Form, Checkbox, ConfigProvider, Divider } from "antd";
import { validateMessages } from "../../Message";
import {
  FormItemMail,
  FormItemPassword,
  FormItemFullName,
  FormItemPhone,
  FormItemGender,
} from "../Shared/Input";
import { ButtonLogin, ButtonRegister } from "../Shared/Button";

export const RegisterForm = ({ onFinish, loading }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="register"
        onFinish={onFinish}
        initialValues={{
          gender: "M",
          isManager: false,
        }}
      >
        <FormItemGender />
        <FormItemFullName />
        <FormItemMail />
        <FormItemPassword />
        <FormItemPassword confirm />
        <FormItemPhone />
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{ required: true }]}
        >
          <Checkbox>J'accepte !</Checkbox>
        </Form.Item>
        <ButtonRegister block htmlType="submit" loading={loading} />
        <Divider>Ou</Divider>
        <ButtonLogin block href="/login" />
      </Form>
    </ConfigProvider>
  );
};
