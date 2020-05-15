import React, { useContext } from "react";
import { Card } from "antd";
import { UserContext } from "../../Context";
import { useMutation } from "@apollo/react-hooks";
import { UPDATEWORKSHOP } from "../../../Gql/Mutation";
import { WorkShopForm } from "./Form";

export const Update = ({ onSuccess, onError }) => {
  const { user, refetch } = useContext(UserContext);
  const [updateWorkShop, optionsUpdateWorkShop] = useMutation(UPDATEWORKSHOP);

  const onFinishWorkshop = ({ action, ...rest }) => {
    updateWorkShop({ variables: { id: user.id, patch: rest } })
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
      <WorkShopForm
        initialValues={user.workshop}
        onFinish={onFinishWorkshop}
        loading={optionsUpdateWorkShop.loading}
      />
    </Card>
  );
};
