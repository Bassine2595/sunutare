import React, { useState } from "react";
import {
  FormItemGender,
  FormItemFullName,
  FormItemPhone,
  FormItemMail,
} from "../../Shared/Input";
import { ButtonSave, ButtonSend } from "../../Shared/Button";
import { Form, Input, Divider, Space, Tag, Select } from "antd";
import Search from "antd/lib/transfer/search";

const { Option } = Select;

export const AddForm = ({ loading, onFinish }) => (
  <Form onFinish={onFinish}>
    <FormItemGender />
    <FormItemFullName />
    <FormItemPhone />
    <FormItemMail />
    <ButtonSave type="primary" htmlType="submit" loading={loading} />
  </Form>
);

const { TextArea } = Input;

export const ContactForm = ({ form, initialValues }) => {
  return (
    <Form initialValues={initialValues} form={form}>
      <Form.Item name="fullname">
        <FormItemFullName />
      </Form.Item>
      <Form.Item name="subject">
        <Select defaultValue="" style={{ width: 200 }}>
          <Option value="Commande Prete">Commande Prete</Option>
          <Option value="Nouveautés">Informer des Nouveautés</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export const FilterForm = ({ onSearch }) => {
  return (
    <Form>
      <Input.Search
        placeholder="Rechercher un client"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </Form>
  );
};
