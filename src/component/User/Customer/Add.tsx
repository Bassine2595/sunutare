import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { AddForm } from "./Form";
import { useMutation } from "@apollo/react-hooks";
import { CUSTOMEREXIST } from "../../../Gql/Mutation";
import { Alert } from "antd";

export const Add = ({ visible, onFinish, onCancel }) => {
  const [exist, setExist] = useState(false);
  const [customerExist, { loading }] = useMutation(CUSTOMEREXIST);
  const onSubmit = (values) => {
    const { phone, mail } = values;
    customerExist({
      variables: { phone, mail },
    }).then(({ data: { customerExist } }) => {
      if (customerExist.exist) {
        setExist(true);
      } else {
        onFinish(values);
      }
    });
  };

  return (
    <Modal
      footer={null}
      title="Ajouter un client"
      visible={visible}
      onCancel={onCancel}
    >
      {exist && (
        <Alert
          message="Le numero de téléphone ou le mail est deja utilisé !"
          showIcon
          type="info"
        />
      )}
      <AddForm onFinish={onSubmit} loading={loading} />
    </Modal>
  );
};
