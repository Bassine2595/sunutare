import React, { useContext } from "react";
import { PasswordForm, ProfilForm } from "./Form";
import { UserContext } from "../../Context";
import {
  UPDATEPASSWORD,
  UPDATEPROFILL,
  CREATEADDRESS,
  UPDATEADDRESS,
} from "../../../Gql/Mutation";
import { useMutation } from "@apollo/react-hooks";
import { AddressForm } from "../Form";

export const Password = ({ onSuccess, onError }) => {
  const { user } = useContext(UserContext);
  const [updatePassword, { loading }] = useMutation(UPDATEPASSWORD);

  const onFinish = (values) => {
    updatePassword({ variables: { id: user.id, ...values } })
      .then((result) => {
        onSuccess(result);
      })
      .catch((error) => {
        onError(error);
      });
  };
  return <PasswordForm onFinish={onFinish} loading={loading} />;
};

export const Profil = ({ onSuccess, onError }) => {
  const { user } = useContext(UserContext);
  const [updateUser, { loading }] = useMutation(UPDATEPROFILL);

  const onFinish = (values) => {
    updateUser({ variables: { id: user.id, ...values } })
      .then((result) => {
        onSuccess(result);
      })
      .catch((error) => {
        onError(error);
      });
  };

  return (
    <ProfilForm initialValues={user} onFinish={onFinish} loading={loading} />
  );
};

export const Address = ({ onSuccess, onError }) => {
  const { user } = useContext(UserContext);
  const [createAddress, optionsCreateAddress] = useMutation(CREATEADDRESS);
  const [updateAddress, optionsUpdateAddress] = useMutation(UPDATEADDRESS);

  const onFinish = ({ action, ...values }) => {
    if (action === "edit") {
      updateAddress({
        variables: { id: user.AddressForm.id, patch: values },
      })
        .then((result) => onSuccess(result))
        .catch((error) => {
          onError(error);
        });
    } else {
      createAddress({ variables: { address: { of: "USER", ...values } } })
        .then((result) => onSuccess(result))
        .catch((error) => {
          onError(error);
        });
    }
  };

  return (
    <AddressForm
      initialValues={user.address}
      onFinish={onFinish}
      loading={optionsCreateAddress.loading || optionsUpdateAddress.loading}
    />
  );
};
