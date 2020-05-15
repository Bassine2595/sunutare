import React, { useState } from "react";
import { UserLayout } from "../Shared/UserLayout";
import { LoginForm } from "./Form";
import { Card, Col, Row, message } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../Gql/Mutation";
import { Auth } from "../../Service";
import jwtDecode from "jwt-decode";
import { Activate } from "./Activate";

export const Login = () => {
  const [login, { loading }] = useMutation(LOGIN);
  const [mail, setMail] = useState();
  const [token, setToken] = useState();

  const onFinish = (values) => {
    login({ variables: values })
      .then((data) => {
        const {
          login: { jwtToken },
        } = data.data;
        if (jwtToken) {
          const { is_active } = jwtDecode(jwtToken);
          if (is_active) {
            Auth.login({
              token: jwtToken,
              cb: () => {
                window.location.href = process.env.REACT_APP_ROOT;
              },
            });
          } else {
            setMail(values.mail);
            setToken(jwtToken);
          }
        } else {
          message.info("E-mail ou Mot de passe incorrect !");
        }
      })
      .catch((error) => {
        message.error("Une erreur est surevenue !");
        console.log(error);
      });
  };

  return (
    <UserLayout>
      <Row justify="center">
        <Col xs={24} md={16} lg={10} xl={8}>
          {mail && token && <Activate mail={mail} token={token} />}
          <Card hoverable title="Connectez-vous">
            <LoginForm onFinish={onFinish} loading={loading} />
          </Card>
        </Col>
      </Row>
    </UserLayout>
  );
};
