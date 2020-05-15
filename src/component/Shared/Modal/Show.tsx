import React from "react";
import { SERVICE } from "../../../Gql/Query";
import { Skeleton, Row, Col, Modal } from "antd";
import { MeasureDescription } from "../../User/Measure/Display";
import { Display as DisplayModele } from "../../User/Modele/Display";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "../../../reducers/Reducer";
import { showModalToggle } from "../../../reducers/service/Reducer";
import { useQuery } from "@apollo/react-hooks";
import { ServiceDescription } from "../Description/Service";
import { ButtonCancel } from "../Button";

export const ShowModal = () => {
  const dispatch = useDispatch();
  const { showModal, service } = useSelector(
    ({ serviceModal }: ReducerType) => serviceModal
  );
  const { data, loading } = useQuery(SERVICE, {
    variables: { id: service?.id },
  });

  return (
    <Modal
      style={{ top: 10 }}
      closable={false}
      title={data?.service.customer.fullName}
      width={700}
      visible={showModal}
      footer={[
        <ButtonCancel
          key="cancel"
          onClick={() => dispatch(showModalToggle())}
        />,
      ]}
    >
      <Skeleton loading={loading}>
        <Row gutter={8}>
          <Col span={10}>
            <DisplayModele {...data?.service.modele} noMeta noExtra />
          </Col>
          <Col span={14}>
            <ServiceDescription
              employes={data?.service.employes}
              dateBegin={data?.service.dateBegin}
              dateFinish={data?.service.dateFinish}
              comment={data?.service.comment}
            />
            <MeasureDescription {...data?.service.measure} />
          </Col>
        </Row>
      </Skeleton>
    </Modal>
  );
};
