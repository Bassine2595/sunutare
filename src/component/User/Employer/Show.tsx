import { Modal, Card, Descriptions } from "antd";
import React from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

export const Show = ({
  employer: {
    contract,
    fullName,
    mail,
    phone,
    city,
    comment,
    number,
    street,
    zip,
  },
  visible,
  onCancel,
}) => {
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <Card style={{ margin: 15 }} bordered={false}>
        <Descriptions title="Infos employé" column={1}>
          <Descriptions.Item>{fullName}</Descriptions.Item>
          <Descriptions.Item label={<PhoneOutlined />}>
            {phone}
          </Descriptions.Item>
          <Descriptions.Item label={<MailOutlined />}>{mail}</Descriptions.Item>
          <Descriptions.Item label="Contract">{contract}</Descriptions.Item>
          <Descriptions.Item label={<EnvironmentOutlined />}>
            {`${number ? number : ""} ${street ? street : ""} ${
              city ? city : ""
            } ${zip ? zip : ""} ${comment ? comment : ""}`}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};
