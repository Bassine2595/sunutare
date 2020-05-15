import React, { useContext } from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { Row, Col, List, Card } from "antd";
import { NOTIFICATIONS } from "../../../Gql/Query";
import { UserContext } from "../../Context";
import { useQuery } from "@apollo/react-hooks";

export const Notification = () => {
  const { user } = useContext(UserContext);
  const { data } = useQuery(NOTIFICATIONS, {
    variables: { workshopId: user.workshop.id, onlyTotalCount: false },
  });
  if (data) {
    console.log(data);
  }
  return (
    <Theme>
      <Row justify="center">
        <Col xs={24}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data?.notifications.nodes}
            renderItem={({ typeNotification, message }) => (
              <List.Item>
                <Card title={typeNotification}>{message}</Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Theme>
  );
};
