import React, { useState } from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { Row, Col, Card, Button, Space, notification } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { ADDSERVICE } from "../../../Gql/Mutation";
import { ServiceForm } from "./Form";
import { ChoiceModele } from "./ChoiceModele";
import { Measure } from "./Measure";
import {
  ArrowLeftOutlined,
  UserAddOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Step } from "./Step";
import { useStep } from "../../../hooks/UseStep";
import { useModal } from "../../../hooks/useModal";
import { Add as AddCustomer } from "../Customer/Add";
import styles from "./Service.module.less";
import { Select as SelectCustomer } from "../Customer/Select";
import { useHistory } from "react-router-dom";

export const Add = () => {
  const [addService, { loading }] = useMutation(ADDSERVICE);
  const [selectModal, selectModalToggle] = useModal();
  const [addModal, addModalToggle] = useModal();
  const [customer, setCustomer] = useState(null);
  const [modele, setModele] = useState(null);
  const [measure, setMeasure] = useState(null);
  const { current, next, prev } = useStep(0, 3);
  const history = useHistory();

  const onFinishService = (values) => {
    const { id, fullName, __typename, ...rest } = customer;
    addService({
      variables: {
        input: {
          customerId: id,
          ...rest,
          modeleId: modele.id,
          ...measure,
          ...values,
        },
      },
    })
      .then(({ data: { addService } }) => {
        notification.success({
          message: `Serivce ${addService.code} créé avec succès !`,
          duration: 20,
        });
        history.push("/service");
      })
      .catch(() => {
        notification.error({ message: "Erreur !" });
      });
  };

  return (
    <Theme>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card
              title={
                current === 0 ? (
                  "Prendre un service "
                ) : (
                  <Button
                    onClick={prev}
                    type="link"
                    icon={<ArrowLeftOutlined />}
                  >
                    Retour
                  </Button>
                )
              }
            >
              <Step current={current} />
            </Card>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card>
              <AddCustomer
                visible={addModal}
                onFinish={(customer) => {
                  setCustomer(customer);
                  addModalToggle();
                  next();
                }}
                onCancel={addModalToggle}
              />
              <SelectCustomer
                visible={selectModal}
                onCancel={selectModalToggle}
                onSelected={(customer) => {
                  setCustomer(customer);
                  selectModalToggle();
                  next();
                }}
              />
              {current === 0 && (
                <Space>
                  <Button
                    onClick={selectModalToggle}
                    type="primary"
                    icon={<SelectOutlined />}
                  />
                  <Button onClick={addModalToggle} icon={<UserAddOutlined />} />
                </Space>
              )}
              {current === 1 && (
                <ChoiceModele
                  onChoice={(modele) => {
                    setModele(modele);
                    next();
                  }}
                />
              )}
              {current === 2 && (
                <Measure
                  onFinish={(measure) => {
                    setMeasure(measure);
                    next();
                  }}
                  customer={customer}
                />
              )}
              {current === 3 && (
                <ServiceForm onFinish={onFinishService} loading={loading} />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Theme>
  );
};
