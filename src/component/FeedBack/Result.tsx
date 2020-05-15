import React from "react";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { ButtonHome } from "../Shared/Button";

export const Warning = (props) => (
  <Result
    {...props}
    status="warning"
    title="Il y a quelques problèmes avec votre opération."
    extra={<ButtonHome href="/" type="primary" />}
  />
);

export const Error403 = (props) => {
  const { search } = useLocation();
  const { message } = queryString.parse(search);
  return (
    <Result
      {...props}
      status={403}
      title="403"
      subTitle={message}
      extra={<ButtonHome href="/" type="primary" />}
    />
  );
};

export const Error500 = (props) => (
  <Result
    {...props}
    status={500}
    title="500"
    subTitle="Désolé, le serveur est erroné !"
    extra={<ButtonHome href="/" type="primary" />}
  />
);

export const Error404 = (props) => (
  <Result
    {...props}
    status={404}
    title="404"
    subTitle="La page que vous demandez n'existe pas !"
    extra={<ButtonHome href="/" type="primary" />}
  />
);

export const SubmissionFailed = (props) => (
  <Result
    {...props}
    status="error"
    title="Échec de la soumission"
    subTitle="Veuillez vérifier et modifier les informations suivantes avant de les soumettre à nouveau !"
    extra={<ButtonHome href="/" type="primary" />}
  />
);

export const NotActive = ({ onClickSendBack, ...props }) => (
  <Result
    {...props}
    status="info"
    title="Votre compte n'est pas active !"
    subTitle="Rendez-vous dans votre boite mail pour l'activer !"
    extra={
      <Button type="link" onClick={onClickSendBack}>
        Ou cliquez ici si vous n'avez pas reçu le mail d'activation !
      </Button>
    }
  />
);

export const TokenInvalid = ({ onClickSendBack, ...props }) => {
  return (
    <Result
      {...props}
      icon={<SmileOutlined />}
      title="Lien expiré !"
      extra={
        <Button type="primary" onClick={onClickSendBack}>
          Renvoyer
        </Button>
      }
    />
  );
};
