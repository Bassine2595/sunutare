import React from "react";
import { Card, Carousel, Tag, Dropdown, Menu, Space } from "antd";
import {
  SmallDashOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

export const Display = ({
  id,
  imageFile,
  name,
  canner,
  onEdit,
  onDelete,
  ...rest
}) => {
  const { noExtra, noMeta } = rest;

  return (
    <Card
      title="Modele"
      extra={
        !noExtra && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => onEdit(id)}>
                  <EditOutlined />
                  <span>Modifier</span>
                </Menu.Item>
                <Menu.Item onClick={() => onDelete(id)}>
                  <DeleteOutlined />
                  <span>Supprimer</span>
                </Menu.Item>
              </Menu>
            }
          >
            <SmallDashOutlined />
          </Dropdown>
        )
      }
      cover={
        imageFile.length > 0 && (
          <Carousel autoplay>
            {imageFile.map(({ name, url }) => (
              <img alt={name} key={name} src={url} height="400" />
            ))}
          </Carousel>
        )
      }
    >
      <Space>
        <Meta description={<Tag color="#1DA57A">{name}</Tag>} />
        {!noMeta && <Meta description={<Tag color="#1DA57A">{canner}</Tag>} />}
      </Space>
    </Card>
  );
};
