import React, { useContext } from "react";
import { Card, Row, Col, Empty } from "antd";
import { SERVICEBYDATE } from "../../../Gql/Query";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../../Context";
import { Service } from "./Display";
import { isEmpty } from "lodash";
import moment from "moment";

type ServiceByDateProps = {
  label: "dateFinish" | "dateBegin";
  value: moment.Moment;
  title: string;
};

export const Index = ({ label, value, title }: ServiceByDateProps) => {
  const { user } = useContext(UserContext);
  const variables =
    label === "dateFinish"
      ? { dateFinish: value, workshopId: user.workshop.id }
      : { dateBegin: value, workshopId: user.workshop.id, isStarded: false };
  const { data, loading } = useQuery(SERVICEBYDATE, {
    variables,
  });

  return !isEmpty(data?.services.nodes) ? (
    <Card
      loading={loading}
      title={title}
      bodyStyle={{
        overflow: "auto",
        height: 500,
      }}
    >
      <Row gutter={[8, 8]}>
        {data &&
          data.services.nodes.map((data, key) => (
            <Col key={key} xs={24} sm={24} md={12} lg={8}>
              <Service service={data} />
            </Col>
          ))}
      </Row>
    </Card>
  ) : (
    <Empty />
  );
};
