import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "../Service";
import { CheckUser } from "./CheckUser";

export const AnonymousRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return Auth.isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
};

export const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isAuthenticated() ? (
          <CheckUser>{children} </CheckUser>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
