import React from "react";
import { Form, ConfigProvider, Row, Col } from "antd";
import { validateMessages } from "../../Message";
import { FormItemPhone, FormItemCode } from "../Shared/Input";
import { ButtonSearch } from "../Shared/Button";

export const SearchForm = ({ onFinish }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form name="search" onFinish={onFinish}>
        <Row gutter={12}>
          <Col xs={24} md={12}>
            <FormItemCode />
          </Col>
          <Col xs={24} md={12}>
            <FormItemPhone />
          </Col>
        </Row>
        <ButtonSearch block type="primary" />
      </Form>
    </ConfigProvider>
  );
};
