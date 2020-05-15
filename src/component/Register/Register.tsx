import React, { useState } from "react";
import { UserLayout } from "../Shared/UserLayout";
import { RegisterForm } from "./Form";
import { Row, Col, Card, message, notification } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../../Gql/Mutation";
import _ from "lodash";
import { checKMail } from "../../Service";

export const Register = () => {
  const [addUser, { loading }] = useMutation(REGISTER);
  const [reset, setReset] = useState(0);

  const onFinish = ({ confirm, agreement, ...values }) => {
    addUser({ variables: { input: values } })
      .then((data) => {
        const {
          register: { jwtToken },
        } = data.data;
        checKMail({
          url: `${process.env.REACT_APP_ROOT}/activate/${jwtToken}`,
          mail: values.mail,
          message:
            "Votre compte sunutare a été créé avec succès. Vous devez maintenant l'activer pour être en mesure de vous connecter. ",
        })
          .then(() => {
            notification.success({
              message:
                "Votre compte sunutare a été créé avec succès. Vous devez maintenant l'activer pour être en mesure de vous connecter.",
              description: "Consulter votre boite pour l'activer !",
              duration: 0,
            });
            setReset((reset) => reset + 1);
          })
          .catch(() => {
            
            notification.error({
              message: "Une erreur est survenue !",
            });
          });
      })
      .catch((reason) => {
        message.info(
          _.includes(reason.message, "unique")
            ? "L'adresse E-mail ou le numéro de téléphone existe déja !"
            : "Erreur réessayer plus tart !"
        );
      });
  };

  return (
    <UserLayout>
      <Row justify="center">
        <Col xs={24} md={16} lg={10} xl={8}>
          <Card hoverable title="Création de compte">
            <RegisterForm onFinish={onFinish} loading={loading} key={reset} />
          </Card>
        </Col>
      </Row>
    </UserLayout>
  );
};
