import React, { useState } from "react";
import { Modal, Divider, Checkbox, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ReducerType } from "../../../reducers/Reducer";
import {
  followModalToggle,
  refetchableToggle,
} from "../../../reducers/service/Reducer";
import { useMutation } from "@apollo/react-hooks";
import { UPDATESERVICEBYCODE } from "../../../Gql/Mutation";
import { Service } from "../../User/Service/Display";
import { ButtonCheck, ButtonCancel } from "../Button";

export const FollowModal = () => {
  const dispatch = useDispatch();
  const { followModal, service } = useSelector(
    ({ serviceModal }: ReducerType) => serviceModal
  );
  const [cut, setCut] = useState(service?.isCut);
  const [over, setOver] = useState(service?.isOver);
  const [start, setStart] = useState(service?.isStarded);
  const [editService, { loading }] = useMutation(UPDATESERVICEBYCODE);

  const onFinish = () => {
    editService({
      variables: {
        code: parseInt(service.code),
        patch: {
          isOver: over,
          isCut: cut,
          isStarded: start,
        },
      },
    })
      .then(() => {
        dispatch(followModalToggle());
        notification.success({ message: "Etape validée avec succès !" });
        dispatch(refetchableToggle());
      })
      .catch(() => {
        notification.error({ message: "Une erreur est survenue !" });
      });
  };

  return (
    <Modal
      key={service?.id}
      style={{ top: 10 }}
      width={400}
      title="Suivre un service"
      closable={false}
      visible={followModal}
      footer={[
        <ButtonCheck loading={loading} key="check" onClick={onFinish} />,
        <ButtonCancel
          key="cancel"
          onClick={() => dispatch(followModalToggle())}
        />,
      ]}
    >
      <Service service={service} noExtra />
      <Divider />
      <Checkbox
        checked={start}
        onChange={({ target: { checked } }) => setStart(checked)}
      >
        Démarré
      </Checkbox>
      <Checkbox
        disabled={!start}
        checked={cut}
        onChange={({ target: { checked } }) => setCut(checked)}
      >
        Coupé
      </Checkbox>
      <Checkbox
        disabled={!cut}
        checked={over}
        onChange={({ target: { checked } }) => setOver(checked)}
      >
        Termininé
      </Checkbox>
    </Modal>
  );
};
