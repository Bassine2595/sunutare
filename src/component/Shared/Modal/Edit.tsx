import React from "react";
import { Modal, Form, notification } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { UPDATESERVICE } from "../../../Gql/Mutation";
import { useSelector, useDispatch } from "react-redux";
import { ReducerType } from "../../../reducers/Reducer";
import {
  editModalToggle,
  refetchableToggle,
} from "../../../reducers/service/Reducer";
import {
  FormItemDateBegin,
  FormItemDateFinish,
  FormItemComment,
} from "../Input";
import { ButtonEdit, ButtonCancel } from "../Button";
import moment from "moment";

const EditForm = ({ form, initialValues: { dateBegin, dateFinish } }) => {
  return (
    <Form
      form={form}
      name="edit"
      initialValues={{
        dateBegin: moment(dateBegin),
        dateFinish: moment(dateFinish),
      }}
      layout="vertical"
    >
      <FormItemDateBegin label="Date de démarrage" />
      <FormItemDateFinish label="Date de livraison" />
      <FormItemComment label="Commentaire" />
    </Form>
  );
};
export const EditModal = () => {
  const dispatch = useDispatch();
  const { editModal, service } = useSelector(
    ({ serviceModal }: ReducerType) => serviceModal
  );
  const [editService, { loading }] = useMutation(UPDATESERVICE);
  const [form] = Form.useForm();

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        editService({
          variables: { id: service?.id, patch: { ...values } },
        })
          .then(() => {
            notification.success({ message: "Service modifié avec succès !" });
            dispatch(refetchableToggle());
          })
          .catch(() => {
            notification.error({ message: "Une erreur est survenue !" });
          });
        dispatch(editModalToggle());
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      closable={false}
      key={service?.id}
      footer={[
        <ButtonEdit key="edit" loading={loading} onClick={onFinish} />,
        <ButtonCancel
          key="cancel"
          onClick={() => dispatch(editModalToggle())}
        />,
      ]}
      visible={editModal}
    >
      <EditForm form={form} initialValues={service} />
    </Modal>
  );
};
