import React from "react";
import { ConfigProvider, Form, Divider } from "antd";
import { validateMessages } from "../../../Message";
import {
  FormItemFullName,
  FormItemPhone,
  FormItemMail,
  FormItemCity,
  FormItemAddress,
  FormItemContract,
  FormItemGender,
 
} from "../../Shared/Input";
import { ButtonSave, ButtonEdit } from "../../Shared/Button";

export const EmployerForm = ({ loading, onFinish }) => (
  <ConfigProvider form={{ validateMessages }}>
    <Form
      name="employer"
      onFinish={onFinish}
      initialValues={{ contract: "CDD" }}
    >
      <FormItemGender />
      <FormItemContract />
      <FormItemFullName />
      <FormItemPhone />
      <FormItemMail />
      <Divider>Address</Divider>
      <FormItemCity />
      <FormItemAddress />
      <ButtonSave type="primary" htmlType="submit" loading={loading} />
    </Form>
  </ConfigProvider>
);
export const EditEmployerForm = ({ loading, onFinish, initialValues }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form name="employer" onFinish={onFinish} initialValues={initialValues}>
        <FormItemPhone />
        <FormItemMail  />
        <FormItemCity />
        <FormItemAddress />
        <ButtonEdit type="primary" htmlType="submit" loading={loading} />

      </Form>
    </ConfigProvider>
  );
};



