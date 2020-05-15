import React, { useEffect, useState } from "react";
import { UserLayout } from "../Shared/UserLayout";
import { Card, Col, Row } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { PasswordForm } from "./Form";
import { CURRENTUSERID } from "../../Gql/Query";
import { UPDATEPASSWORD } from "../../Gql/Mutation";
import { useMutation } from "@apollo/react-hooks";
import { TokenInvalid } from "../FeedBack/Result";
import Client from "../../Client";

export const PasswordReset = () => {
  const { token } = useParams();
  const [id, setId] = useState(null);
  const [valid, setValid] = useState(true);
  const history = useHistory();
  const [updatePassword, { loading }] = useMutation(UPDATEPASSWORD);

  useEffect(() => {
    Client({ token })
      .query({ query: CURRENTUSERID })
      .then(({ data: { currentUser } }) => {
        setId(currentUser.id);
      })
      .catch(() => setValid(true));
  });
  const onFinish = ({ password }) => {
    updatePassword({ variables: { id, password } }).then(() => {
      history.push("/login");
    });
  };

  if (!valid) {
    return (
      <TokenInvalid
        onClickSendBack={() => {
          history.push("/forget-password");
        }}
      />
    );
  }
  return (
    <UserLayout>
      <Row justify="center">
        <Col xs={24} md={16} lg={10} xl={8}>
          <Card
            hoverable
            style={{ borderRadius: 8 }}
            title="Saisisser votre nouveau mot de passe !"
          >
            <PasswordForm onFinish={onFinish} loading={loading} />
          </Card>
        </Col>
      </Row>
    </UserLayout>
  );
};
