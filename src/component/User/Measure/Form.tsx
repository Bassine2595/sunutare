import React from "react";
import { ConfigProvider, Form, Row, Col, InputNumber } from "antd";
import { validateMessages } from "../../../Message";
import { ButtonSave } from "../../Shared/Button";

export const MeasureForm = ({ loading, onFinish, initialValues }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        layout="vertical"
        name="measures"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row>
          <Col xs={12} md={8}>
            <Form.Item name="length" label="Longueur">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item name="width" label="Largeur">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item name="pants" label="Pantalon">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item name="breasts" label="Bassin">
              <InputNumber min={0} />
            </Form.Item>
          </Col>

          <Col xs={12} md={8}>
            <Form.Item name="longSleeve" label="Longue manche">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item name="lowsLeeve" label="Courte manche">
              <InputNumber min={0} />
            </Form.Item>
          </Col>

          <Col xs={12} md={8}>
            <Form.Item name="hips" label="Hanche">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item name="belt" label="Ceinture">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>
        <ButtonSave type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};
