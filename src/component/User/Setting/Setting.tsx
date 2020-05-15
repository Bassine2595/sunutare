import React from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { PageHeader, Row, Col, Tabs, Card, message } from "antd";
import {
  ScissorOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Update as UpdateWorkshop } from "../Workshop/Workshop";
import { Update as UpdateAddress } from "../Workshop/Address";
import { Profil } from "../Profil/Profil";

const { TabPane } = Tabs;

export const Setting = () => {
  return (
    <Theme>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={16}>
          <PageHeader
            onBack={() => window.history.back()}
            ghost={false}
            title="Configuration"
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={16}>
          <Card>
            <Tabs defaultActiveKey="profil">
              <TabPane
                tab={
                  <span>
                    <UserOutlined />
                    Mon profil
                  </span>
                }
                key="profil"
              >
                <Profil />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <ScissorOutlined />
                    Mon Atelier
                  </span>
                }
                key="workshop"
              >
                <UpdateWorkshop
                  onSuccess={() => {
                    message.success("");
                  }}
                  onError={() => {}}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <EnvironmentOutlined />
                    Adresse atelier
                  </span>
                }
                key="address"
              >
                <UpdateAddress onError={() => {}} onSuccess={() => {}} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Theme>
  );
};
