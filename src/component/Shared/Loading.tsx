import React from "react";
import { Spin } from "antd";

export const Loading = () => (
  <div style={{ textAlign: "center", paddingTop: "50vh" }}>
    <Spin size="large" />
  </div>
);
