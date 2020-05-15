import React from "react";
import { ConfigProvider, Form } from "antd";
import { ButtonSave } from "../../Shared/Button";
import {
  FormItemName,
  FormItemPhoneFixe,
  FormItemSite,
  FormItemMail,
  FormItemSlogan,
  FormItemSpeciality,
} from "../../Shared/Input";
import { validateMessages } from "../../../Message";

export const WorkShopForm = ({ loading, onFinish, initialValues }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form name="workshop" onFinish={onFinish} initialValues={initialValues}>
        <FormItemName />
        <FormItemPhoneFixe />
        <FormItemSite />
        <FormItemMail />
        <FormItemSlogan />
        <FormItemSpeciality />
        <ButtonSave type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};
