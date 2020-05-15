import React, { useContext } from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { Row, Col, Card } from "antd";
import { MeasureForm } from "./Form";
import { useMutation } from "@apollo/react-hooks";
import { CREATEMEASURE, UPDATEMEASURE } from "../../../Gql/Mutation";
import { UserContext } from "../../Context";

const Measure = () => {
  const { user, refetch } = useContext(UserContext);
  const [createMeasure, createMeasureOptions] = useMutation(CREATEMEASURE);
  const [updateMeasure, updateMeasureOptions] = useMutation(UPDATEMEASURE);

  const onFinish = ({ action, ...values }) => {
    if (action === "add") {
      createMeasure({ variables: { ...values, userId: user.id } });
    } else {
      updateMeasure({
        variables: { ...values, id: user.measure.id },
      });
    }
    refetch();
  };

  return (
    <Theme>
      <Row justify="end">
        <Col span={10}>
          <Card>
            <MeasureForm
              initialValues={user.measur}
              onFinish={onFinish}
              loading={
                createMeasureOptions.loading || updateMeasureOptions.loading
              }
            />
          </Card>
        </Col>
      </Row>
    </Theme>
  );
};

export default Measure;
