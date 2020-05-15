import React, { useContext, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { useMutation } from "@apollo/react-hooks";
import { CREATEMODELE } from "../../../Gql/Mutation";
import { UserContext } from "../../Context";
import { AddModeleForm } from "./Form";
import { Card } from "antd";

export const Add = ({ visible, onCancel, onSuccess, onError }) => {
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);
  const [createModele, { loading }] = useMutation(CREATEMODELE);

  const onFinish = (values) => {
    createModele({
      variables: { modele: { workshopId: user.workshop.id, ...values } },
    })
      .then((result) => {
        onSuccess(result);
        setCount((count) => count + 1);
      })
      .catch((error) => {
        console.log(error);
        onError(error);
      });
  };

  return (
    <Modal footer={null} visible={visible} onCancel={onCancel} key={count}>
      <Card title="Ajouter un modele" style={{ margin: 15 }} bordered={false}>
        <AddModeleForm onFinish={onFinish} loading={loading} />
      </Card>
    </Modal>
  );
};
