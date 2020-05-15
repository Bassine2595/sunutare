import React from "react";
import { Steps } from "antd";
import {
  InfoCircleOutlined,
  EnvironmentOutlined,
  CheckOutlined,
} from "@ant-design/icons";

export const Step = ({ current }) => {
  return (
    <Steps size="small" current={current}>
      <Steps.Step
        title="Infos sur votre atelier"
        icon={<InfoCircleOutlined />}
      />
      <Steps.Step
        title="Adresse de votre atelier"
        icon={<EnvironmentOutlined />}
      />
      <Steps.Step title="Terminer" icon={<CheckOutlined />} />
    </Steps>
  );
};
