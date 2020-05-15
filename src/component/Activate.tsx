import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { CURRENTUSERID } from "../Gql/Query";
import { useMutation } from "@apollo/react-hooks";
import { ACTIVEUSER } from "../Gql/Mutation";
import Client from "../Client";
import { Loading } from "./Shared/Loading";

export const Activate = () => {
  const { token } = useParams();
  const [activeUser] = useMutation(ACTIVEUSER);
  const history = useHistory();

  if (token) {
    Client({ token })
      .query({ query: CURRENTUSERID })
      .then(({ data: { id } }) => {
        activeUser({ variables: { id } });
        history.push(`/workshop/${token}`);
      })
      .catch((reason) => {
        history.push(`/403?message=${reason.message}`);
      });
  }
  return <Loading />;
};
