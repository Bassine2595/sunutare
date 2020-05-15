import React, { useContext } from "react";
import { Card } from "antd";
import { UserContext } from "../../Context";
import { useMutation } from "@apollo/react-hooks";
import { UPDATEADDRESS } from "../../../Gql/Mutation";
import { AddressForm } from "../Form";

export const Update = ({ onSuccess, onError }) => {
  const { user, refetch } = useContext(UserContext);
  const [updateAddress, { loading }] = useMutation(UPDATEADDRESS);

  const onFinish = ({ action, ...rest }) => {
    action === "edit" &&
      updateAddress({ variables: { id: user.workshop.id, patch: rest } })
        .then((result) => {
          refetch();
          onSuccess(result);
        })
        .catch((error) => {
          onError(error);
        });
  };

  return (
    <Card>
      <AddressForm
        initialValues={user.workshop?.address}
        onFinish={onFinish}
        loading={loading}
      />
    </Card>
  );
};
