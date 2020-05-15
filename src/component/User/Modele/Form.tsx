import React, { useState } from "react";
import { ConfigProvider, Form, Upload, Button } from "antd";
import {
  FormItemName,
  FormItemDescription,
  FormItemTypeModele,
  FormItemCanner,
} from "../../Shared/Input";
import { validateMessages } from "../../../Message";
import { UploadOutlined } from "@ant-design/icons";
import { ButtonSave, ButtonEdit, ButtonFilter } from "../../Shared/Button";
import { deleteFile } from "../../../Service";
import _ from "lodash";

const remove = (file) =>
  deleteFile({ uid: file.response ? file.response.uid : file.uid });

export const AddModeleForm = ({ onFinish, loading }) => {
  const [fileList, setFileList] = useState(null);

  const handleChange = ({ file, fileList }) => {
    console.log(file);
    file.status === "done" && setFileList(fileList);
  };

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="modele"
        onFinish={(values) =>
          onFinish({
            ...values,
            imageFile: fileList.map(({ response }) => response),
          })
        }
      >
        <FormItemCanner />
        <FormItemTypeModele />
        <FormItemName />
        <FormItemDescription />
        <Form.Item>
          <Upload
            showUploadList={{ showPreviewIcon: false }}
            onRemove={remove}
            listType="picture-card"
            action={`${process.env.REACT_APP_BASE_URL_API}/upload/photos`}
            onChange={handleChange}
          >
            <Button type="link" icon={<UploadOutlined />}>
              Photo
            </Button>
          </Upload>
        </Form.Item>
        <ButtonSave
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={_.isEmpty(fileList)}
        />
      </Form>
    </ConfigProvider>
  );
};

export const UpdateModeleForm = ({ initialValues, onFinish, loading }) => {
  const [fileList, setFileList] = useState(initialValues.imageFile);

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        name="modele"
        onFinish={(values) => {
          _.differenceWith(
            initialValues.imageFile,
            fileList,
            (a: any, b: any) => a.uid === b.uid
          ).map(({ uid }) => remove({ uid }));
          onFinish({
            ...values,
            imageFile: fileList.map((file) =>
              file.response ? file.response : file
            ),
          });
        }}
        initialValues={initialValues}
        layout="vertical"
      >
        <FormItemCanner label="Pour" />
        <FormItemTypeModele label="Type de modèle" />
        <FormItemName label="Nom " />
        <FormItemDescription label="Description" />
        <Form.Item>
          <Upload
            showUploadList={{ showPreviewIcon: false }}
            listType="picture-card"
            action={`${process.env.REACT_APP_BASE_URL_API}/upload/photos`}
            onChange={handleChange}
            fileList={fileList}
          >
            <Button type="link" icon={<UploadOutlined />}>
              Photo
            </Button>
          </Upload>
        </Form.Item>
        <ButtonEdit type="primary" htmlType="submit" loading={loading} />
      </Form>
    </ConfigProvider>
  );
};

export const FormFilter = ({ onFinish }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form name="filter" onFinish={onFinish} layout="inline" size="small">
        <FormItemCanner all />
        <FormItemTypeModele noRule />
        <ButtonFilter type="primary" htmlType="submit" />
      </Form>
    </ConfigProvider>
  );
};
