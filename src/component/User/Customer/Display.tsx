import React from "react";
import { List, Card, Avatar, Descriptions, Progress, Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import Male from "../../../Male.svg";
import Female from "../../../Female.svg";

export const ListCustomer = ({ data, onSelected }) => {
  return (
    <List
      grid={{ xs: 1 }}
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      style={{ margin: 15, overflow: "auto", height: 500 }}
      bordered={false}
      renderItem={(customer: any) => (
        <List.Item>
          <Card onClick={() => onSelected(customer)} hoverable>
            <List.Item.Meta title={customer.fullName} />
            <List.Item.Meta title={customer.phone} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export const Display = ({ numberServicesByYear, onContact, ...customer }) => {
  const { id, fullName, mail, phone, gender, count } = customer;
  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          shape="round"
          onClick={() => onContact(customer)}
        >
          Contacter le client
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={gender === "M" ? Male : Female} size={64} />}
        title={fullName}
      />
      <List.Item.Meta
        title={
          <span>
            <MailOutlined /> Email
          </span>
        }
        description={mail}
      />
      <List.Item.Meta
        title={
          <span>
            <PhoneOutlined /> Telephone
          </span>
        }
        description={phone}
      />

      <Progress
        showInfo={false}
        strokeColor="#1da57a"
        trailColor="#e7efe9"
        percent={(100 * count) / numberServicesByYear}
        style={{ width: 120 }}
      />
    </List.Item>
  );
};
