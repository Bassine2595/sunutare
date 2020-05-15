import React from "react";
import { Card, Timeline, Row, Col, Progress, Tag } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";

export const State = ({
  dateBegin,
  isCut,
  isDelivered,
  isOver,
  isStarded,
  createdAt,
  code,
  progress,
}) => {
  return (
    <Card title={<Tag color="#1DA57A">Code service: {code}</Tag>}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Progress
            strokeWidth={30}
            showInfo={false}
            successPercent={progress}
          />
        </Col>
        <Col span={24}>
          <Timeline>
            <Timeline.Item>
              Enregistré le {moment(createdAt).format("DD MMM YYYY")}
            </Timeline.Item>
            <Timeline.Item>
              Date prévu de démarrage {moment(dateBegin).format("DD MMM YYYY")}
            </Timeline.Item>
            <Timeline.Item
              dot={isStarded ? <CheckCircleOutlined /> : <LoadingOutlined />}
            >
              Prise en charge
            </Timeline.Item>
            <Timeline.Item
              dot={isCut ? <CheckCircleOutlined /> : <LoadingOutlined />}
            >
              Prise en charge
            </Timeline.Item>
            <Timeline.Item
              dot={isOver ? <CheckCircleOutlined /> : <LoadingOutlined />}
            >
              Terminier
            </Timeline.Item>
            <Timeline.Item
              dot={isDelivered ? <CheckCircleOutlined /> : <LoadingOutlined />}
            >
              Livrer
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </Card>
  );
};
