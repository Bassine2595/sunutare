import React, { useState, useEffect } from "react";
import { UserLayout } from "../Shared/UserLayout";
import { Row, Col, Card, message, Button } from "antd";
import { MailForm } from "./Form";
import { useMutation } from "@apollo/react-hooks";
import { GENERATETOKEN } from "../../Gql/Mutation";
import { checKMail } from "../../Service";

export const GenerateLinkReset = () => {
  const [generateToken, { loading }] = useMutation(GENERATETOKEN);
  const [values, setValues] = useState(null);

  useEffect(() => {
    if (values) {
      checKMail({
        url: `${process.env.REACT_APP_ROOT}/activate/${values.jwtToken}`,
        mail: values.mail,
        message:
          "Votre compte sunutare a été créé avec succès Vous devez maintenant l'activer pour être en mesure de vous connecter. ",
      }).then(() => {});
    }
  }, [values]);
  const onFinish = ({ mail }) => {
    generateToken({ variables: { mail } }).then(({ data: { token } }) => {
      const { jwtToken } = token;
      if (!jwtToken) {
        message.info("Ce compte n'existe pas !");
      } else {
        setValues({ mail, jwtToken });
        message.info(
          "Un lien de réinitialisation de mot de passe vous est envoyé par mail !"
        );
      }
    });
  };

  return (
    <UserLayout>
      <Row justify="center">
        <Col xs={24} md={16} lg={10} xl={8}>
          {values ? (
            <Button type="primary">
              Cliquez ici si vous ne recevez pas un mail
            </Button>
          ) : (
            <Card
              title="Saisisser votre mail pour réinitialiser votre mot de passe !"
              hoverable
              style={{ borderRadius: 8 }}
            >
              <MailForm onFinish={onFinish} loading={loading} />
            </Card>
          )}
        </Col>
      </Row>
    </UserLayout>
  );
};
