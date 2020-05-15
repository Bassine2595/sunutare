import React, { useState } from "react";
import { ConfigProvider, Form, Upload, Radio, Row, Col, Input } from "antd";
import { validateMessages } from "../../../Message";
import {
  FormItemTypeTissu,
  FormItemPrice,
  FormItemDateBeginAndFinish,
  FormItemResponsable,
  FormItemComment,
  FormItemDateFinish,
  FormItemDateBegin,
} from "../../Shared/Input";
import { UploadOutlined } from "@ant-design/icons";
import { ButtonSave, ButtonEdit } from "../../Shared/Button";

export const ServiceForm = ({ loading, onFinish }) => {
  const [fileList, setFileList] = useState(null);
  const onChange = ({ file }) => {
    if (file.status === "done") {
      setFileList((fileList) =>
        fileList === null ? [file.response] : [file.response, ...fileList]
      );
    }
  };
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="service"
        onFinish={(values) =>
          onFinish({
            ...values,
            imageFile: fileList,
          })
        }
      >
        <Row>
          <Col xs={24} md={12}>
            <FormItemTypeTissu />
          </Col>
        </Row>
        <FormItemPrice />
        <FormItemDateBeginAndFinish />
        <Row>
          <Col xs={24} md={12}>
            <FormItemResponsable />
          </Col>
        </Row>
        <FormItemComment />
        <Form.Item>
          <Upload
            action={`${process.env.REACT_APP_BASE_URL_API}/upload/photos`}
            listType="picture-card"
            onChange={onChange}
          >
            <UploadOutlined style={{ fontSize: 20 }} />
          </Upload>
        </Form.Item>
        <ButtonSave type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};

export const EditForm = ({ onFinish, loading, initialValues }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="edit"
        onFinish={onFinish}
        initialValues={initialValues}
        layout="vertical"
      >
        <FormItemDateBegin label="Date de démarrage" />
        <FormItemDateFinish label="Date de livraison" />
        <FormItemComment label="Commentaire" />
        <ButtonEdit type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};

export const FilterForm = ({ onChange }) => {
  return (
    <Radio.Group buttonStyle="solid" onChange={onChange} size="small">
      <Radio.Button value={undefined}>Tous</Radio.Button>
      <Radio.Button value="start">Commencer</Radio.Button>
      <Radio.Button value="cut">En cours</Radio.Button>
      <Radio.Button value="over">Terminer</Radio.Button>
      <Radio.Button value="deliver">Livrer</Radio.Button>
    </Radio.Group>
  );
};

export const SearchService = ({ onSearch }) => {
  return (
    <Form>
      <Input.Search
        placeholder="Rensigner les informations "
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </Form>
  );
};
