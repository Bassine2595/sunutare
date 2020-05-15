import React, { useContext } from "react";
import { Modal } from "antd";
import { ListCustomer } from "./Display";
import { useQuery } from "@apollo/react-hooks";
import { CUSTOMERSBYWORKSHOPID } from "../../../Gql/Query";
import { UserContext } from "../../Context";

export const Select = ({ visible, onSelected, onCancel }) => {
  const { user } = useContext(UserContext);
  const { data } = useQuery(CUSTOMERSBYWORKSHOPID, {
    variables: { workshopId: user.workshop.id },
  });

  return (
    <Modal visible={visible} footer={null} onCancel={onCancel}>

        <ListCustomer data={data?.customers.nodes} onSelected={onSelected} />
      
    </Modal>
  );
};
