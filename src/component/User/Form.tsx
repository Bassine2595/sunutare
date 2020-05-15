import React from "react";
import { Form, ConfigProvider } from "antd";
import { validateMessages } from "../../Message";
import {
  FormItemCity,
  FormItemAddress,
  FormItemComment,
} from "../Shared/Input";
import { ButtonCheck } from "../Shared/Button";

export const AddressForm = ({ initialValues, loading, onFinish }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="address"
        onFinish={(values) =>
          onFinish({ action: initialValues ? "edit" : "add", ...values })
        }
        initialValues={initialValues}
      >
        <FormItemCity />
        <FormItemAddress />
        <FormItemComment />
        <ButtonCheck type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};
