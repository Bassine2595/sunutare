import React, { useContext, useState } from "react";
import { Modal, Alert } from "antd";
import { EmployerForm } from "./Form";
import { useMutation } from "@apollo/react-hooks";
import { CREATEEMPLOYER, EMPLOYEREXIST } from "../../../Gql/Mutation";
import { UserContext } from "../../Context";

export const Add = ({ visible, onCancel, onSuccess, onError }) => {
  const { user } = useContext(UserContext);
  const [hide, toggle] = useState(true);
  const [employerExist, employerExistOptions] = useMutation(EMPLOYEREXIST);
  const [createEmployer, createEmployerOptions] = useMutation(CREATEEMPLOYER);

  const onFinish = (values) => {
    const { phone, mail } = values;
    employerExist({
      variables: { phone, mail },
    }).then(({ data: { employerExist } }) => {
      if (employerExist.exist) {
        toggle((hide) => !hide);
      } else {
        createEmployer({
          variables: {
            input: { ...values, workshopId: user.workshop.id },
          },
        })
          .then((data) => {
            onSuccess(data);
          })
          .catch((error) => {
            onError(error);
          });
      }
    });
  };

  return (
    <Modal footer={null} visible={visible} onCancel={onCancel}>
      {!hide && (
        <Alert
          message="Le numero de téléphone ou le mail est deja utilisé !"
          showIcon
          type="info"
        />
      )}
      <EmployerForm
        loading={createEmployerOptions.loading || employerExistOptions.loading}
        onFinish={onFinish}
      />
    </Modal>
  );
};
