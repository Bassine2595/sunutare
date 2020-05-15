import React from "react";
import { Tabs, Card } from "antd";
import {
  FieldTimeOutlined,
  ReloadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { State } from "./State";
import { Reminder } from "./Reminder";

const { TabPane } = Tabs;

export const Handle = ({ service }) => {
  console.log(service);
  return (
    <Card>
      <Tabs>
        <TabPane
          tab={
            <span>
              <FieldTimeOutlined />
              Où en est ma commande
            </span>
          }
          key="state"
        >
          <State {...service} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ReloadOutlined />
              Je fais une relance
            </span>
          }
          key="reminder"
        >
          <Reminder {...service} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <MoreOutlined />
              Autre
            </span>
          }
          key="other"
        ></TabPane>
      </Tabs>
    </Card>
  );
};
