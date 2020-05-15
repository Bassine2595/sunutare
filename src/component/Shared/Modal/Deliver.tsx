import React from "react";
import { Modal, Form, ConfigProvider, notification } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { UPDATESERVICE } from "../../../Gql/Mutation";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "../../../reducers/Reducer";
import { FormItemPaymentFinal } from "../Input";
import { ButtonCheck, ButtonCancel } from "../Button";
import { validateMessages } from "../../../Message";
import {
  deliverModalToggle,
  refetchableToggle,
} from "../../../reducers/service/Reducer";
import { ServicePriceDescription } from "../Description/Service";

const DeliverForm = ({ form }) => {
  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form name="deliver" form={form}>
        <FormItemPaymentFinal />
      </Form>
    </ConfigProvider>
  );
};

export const DeliverModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { deliverModal, service } = useSelector(
    ({ serviceModal }: ReducerType) => serviceModal
  );
  const [editService, { loading }] = useMutation(UPDATESERVICE);

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        editService({
          variables: {
            patch: { id: service?.id, isDelivered: true, ...values },
          },
        })
          .then(({ data }) => {
            notification.success({ message: "Service livré avec succès" });
            dispatch(refetchableToggle());
          })
          .catch(() => {
            notification.error({ message: "Une erreur est survenue!" });
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Livrer un service"
      visible={deliverModal}
      footer={[
        <ButtonCheck key="check" loading={loading} onClick={onFinish} />,
        <ButtonCancel
          key="cancel"
          onClick={() => dispatch(deliverModalToggle())}
        />,
      ]}
    >
      <ServicePriceDescription {...service} />
      <DeliverForm form={form} />
    </Modal>
  );
};
