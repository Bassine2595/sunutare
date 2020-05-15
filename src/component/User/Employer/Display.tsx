import React from "react";
import { Button, Card, Space } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  EditOutlined,
  InfoCircleOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

export const Display = ({
  onClickShow,
  onClickMake,
  onClickEdit,
  ...employer
}) => {
  const isMd = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Card title={employer.fullName} hoverable>
      <Space>
        <Button
          size="small"
          type="primary"
          onClick={() => onClickShow(employer)}
          key="show"
          icon={<InfoCircleOutlined />}
        >
          {!isMd && "Informations"}
        </Button>
        <Button
          size="small"
          type="primary"
          onClick={() => onClickMake(employer)}
          key="make"
          icon={<DatabaseOutlined />}
        >
          {!isMd && "Realisations"}
        </Button>
        {/* <EditEmployer /> */}
        <Button
          size="small"
          type="primary"
          onClick={() => onClickEdit(employer)}
          key="edit"
          icon={<EditOutlined />}
        >
          {!isMd && "Modifier"}
        </Button>
      </Space>
    </Card>
  );
};
