import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, message, Button } from "antd";
import { CREATEWORKSHOP } from "../../../Gql/Mutation";
import { useParams, useHistory } from "react-router-dom";
import { Step } from "./Step";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useStep } from "../../../hooks/UseStep";
import Client from "../../../Client";
import { UserLayout } from "../../Shared/UserLayout";
import { WorkShopForm } from "./Form";
import { AddressForm } from "../Form";

export const Add = () => {
  const { token } = useParams();
  const history = useHistory();
  const { current, next, prev } = useStep(0, 2);
  const [workshop, setWorkshop] = useState(null);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    if (flash) {
      notification.open({
        message:
          "Félication ! Veillez renseigner les informations sur votre atelier",
      });
      setFlash(false);
    }
  }, [flash]);

  const onFinishWorkshop = (values) => {
    setWorkshop(values);
    next();
  };

  const onFinishAddress = ({ action, ...values }) => {
    Client({ token })
      .mutate({
        mutation: CREATEWORKSHOP,
        variables: { addWorkshop: { ...values, ...workshop } },
      })
      .then(() => {
        message.success("Ajout réussi !");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        message.error("Une erreur est survenue réessayer plus tard !");
      });
    next();
  };

  return (
    <UserLayout>
      <Row justify="center">
        <Col xs={24} md={16} lg={10}>
          <Card>
            <Step current={current} />
          </Card>
          <Card
            title={
              current > 0 && (
                <Button onClick={prev} type="link" icon={<ArrowLeftOutlined />}>
                  Retour
                </Button>
              )
            }
          >
            {current === 0 && (
              <WorkShopForm
                initialValues={null}
                onFinish={onFinishWorkshop}
                loading={false}
              />
            )}
            {current === 1 && (
              <AddressForm
                initialValues={null}
                onFinish={onFinishAddress}
                loading={false}
              />
            )}
          </Card>
        </Col>
      </Row>
    </UserLayout>
  );
};
