import React from "react";
import { Modal, Card } from "antd";
import { EditForm } from "./Form";
import { useMutation } from "@apollo/react-hooks";
import { CloseCircleOutlined } from "@ant-design/icons";
import { UPDATESERVICE } from "../../../Gql/Mutation";
import moment from "moment";

export const Edit = ({ service, onCancel, visible, onSuccess, onError }) => {
  const [editService, { loading }] = useMutation(UPDATESERVICE);
  const onFinish = (values) => {
    editService({
      variables: { id: service?.id, patch: { ...values } },
    })
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch((error) => onError(error));
  };
  return (
    <Modal
      key={service?.id}
      footer={null}
      onCancel={onCancel}
      visible={visible}
      closeIcon={<CloseCircleOutlined style={{ color: "#1DA57A" }} />}
    >
      <Card loading={loading} title="Modification" bordered={false}>
        <EditForm
          onFinish={onFinish}
          loading={loading}
          initialValues={{
            dateFinish: moment(service?.dateFinish),
            dateBegin: moment(service?.dateBegin),
            comment: service?.comment,
          }}
        />
      </Card>
    </Modal>
  );
};
