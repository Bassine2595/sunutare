import React from "react";
import { Form } from "antd";
import { FormItemCanner, FormItemTypeModele } from "../Shared/Input";
import { ButtonFilter } from "../Shared/Button";

export const FormFilter = ({ onFinish, initialValues }) => {
  return (
    <Form
      name="filter"
      onFinish={onFinish}
      size="small"
      layout="horizontal"
      initialValues={initialValues}
    >
      <FormItemCanner all />
      <FormItemTypeModele noRule />
      <ButtonFilter block type="primary" htmlType="submit" />
    </Form>
  );
};
