import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENTUSER } from "../Gql/Query";
import { Error500 } from "./FeedBack/Result";
import { UserContext } from "./Context";
import { Loading } from "./Shared/Loading";
import { Redirect, useHistory } from "react-router-dom";
import { Auth } from "../Service";

export const CheckUser = ({ children }) => {
  const { loading, data, error, refetch } = useQuery(CURRENTUSER);
  const history = useHistory();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error500 />;
  }

  if (data && !data.currentUser) {
    Auth.clear(() => {
      history.push("/login");
    });
    return <Loading />;
  }

  if (data && data.currentUser && !data.currentUser.isActive) {
    return <Redirect to="/activate" />;
  }

  return (
    <UserContext.Provider value={{ user: data.currentUser, refetch: refetch }}>
      {children}
    </UserContext.Provider>
  );
};
