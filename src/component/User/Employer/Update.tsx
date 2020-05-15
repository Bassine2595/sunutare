import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { EditEmployerForm } from "./Form";
import { UPDATEEMPLOYER } from "../../../Gql/Mutation";
import { Modal, Card } from "antd";
import { UserContext } from "../../Context";

export const EditEmployer = ({
  employer,
  visible,
  onCancel,
  onSuccess,
  onError,
}) => {
  const [updateEmployer, { loading }] = useMutation(UPDATEEMPLOYER);
  const { user } = useContext(UserContext);
  console.log(user.workshop.id);

  const onFinishProfil = (values) => {
    console.log(values);
    updateEmployer({
      variables: {
        id: employer.id,
        patch: values,
        workshopId: user.workshop.id,
      },
    })
      .then((result) => onSuccess(result))
      .catch((reason) => onError(reason));
  };

  return (
    <Modal footer={null} visible={visible} onCancel={onCancel}>
      <Card title="Modifié employé" style={{ margin: 20 }}>
        <EditEmployerForm
          initialValues={employer}
          onFinish={onFinishProfil}
          loading={loading}
        />
      </Card>
    </Modal>
  );
};
