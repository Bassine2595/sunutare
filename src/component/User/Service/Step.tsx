import React from "react";
import { Steps } from "antd";
import { useMediaQuery } from "react-responsive";

import {
  UserOutlined,
  SkinOutlined,
  FormOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

export const Step = ({ current }) => {
  const isMd = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Steps current={current} style={{ marginBottom: 20 }} size="small">
      <Steps.Step
        key="0"
        title={!isMd && "Identification"}
        icon={<UserOutlined />}
      />
      <Steps.Step
        key="1"
        title={!isMd && "Choix modèle"}
        icon={<SkinOutlined />}
      />
      <Steps.Step key="2" title={!isMd && "Mesure"} icon={<FormOutlined />} />
      <Steps.Step
        key="3"
        title={!isMd && "Service"}
        icon={<ShoppingOutlined />}
      />
    </Steps>
  );
};
