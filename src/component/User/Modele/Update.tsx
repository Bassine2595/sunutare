import React from "react";
import Modal from "antd/lib/modal/Modal";
import { UpdateModeleForm } from "./Form";
import { useMutation } from "@apollo/react-hooks";
import { UPDATEMODELE } from "../../../Gql/Mutation";

export const Update = ({ modele, visible, onCancel, onSuccess, onError }) => {
  const [updateModele, { loading }] = useMutation(UPDATEMODELE);

  const onFinish = (values) => {
    updateModele({
      variables: { id: modele.id, patch: values },
    })
      .then((result) => onSuccess(result))
      .catch((error) => onError(error));
  };

  return (
    <Modal key={modele?.id} footer={null} visible={visible} onCancel={onCancel}>
      <UpdateModeleForm
        initialValues={modele}
        onFinish={onFinish}
        loading={loading}
      />
    </Modal>
  );
};
