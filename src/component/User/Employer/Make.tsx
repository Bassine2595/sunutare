import { Modal, Skeleton } from "antd";
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { SERVICESBYEMPLOYER } from "../../../Gql/Query";
import { ServiceResumeList } from "../Service/Display";
import { UserContext } from "../../Context";

export const Make = ({ employer, visible, onCancel }) => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(SERVICESBYEMPLOYER, {
    variables: { employerId: employer.id, workshopId: user.workshop.id },
  });
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      {loading ? (
        <Skeleton />
      ) : (
        <ServiceResumeList data={data?.services.nodes} />
      )}
    </Modal>
  );
};
