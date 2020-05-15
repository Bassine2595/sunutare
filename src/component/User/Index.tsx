import React from "react";
import { Theme } from "../Shared/ManagerLayout";
import { Row, Col } from "antd";
import {
  Count as ServicesCount,
  DeliveredWithin7Days,
  NumberOfServicePerDays,
  NumberOfServicePerMonths,
  PressureRate,
} from "../Statistic/Service";
import { Count as ModelesCount } from "../Statistic/Modele";
import moment from "moment";
import { Index as ServiceByDateBegin } from "./Service/ServiceByDate";
import { Index as ServiceByDateFinish } from "./Service/ServiceByDate";

const toDay = moment();

const Index = () => {
  return (
    <Theme>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12} lg={8}>
          <ServicesCount />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <ModelesCount />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <DeliveredWithin7Days />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <NumberOfServicePerMonths />
        </Col>
        <Col xs={24} md={12}>
          <NumberOfServicePerDays />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <PressureRate />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <ServiceByDateBegin
            label="dateBegin"
            value={toDay}
            title="Services à commencer aujourd'hui"
          />
        </Col>
        <Col xs={24} md={12}>
          <ServiceByDateFinish
            label="dateFinish"
            value={toDay}
            title="Services à finir aujourd'hui"
          />
        </Col>
      </Row>
    </Theme>
  );
};

export default Index;
