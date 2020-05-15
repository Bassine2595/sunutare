import { Modal, Skeleton } from "antd";
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { SERVICEBYMONTH } from "../../Gql/Query";
import { ServiceResumeList } from "../User/Service/Display";
import { UserContext } from "../Context";

export const SerciceByMonth = ({ month, visible, onCancel }) => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(SERVICEBYMONTH, {
    variables: { month, workshopId: user.workshop.id },
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
