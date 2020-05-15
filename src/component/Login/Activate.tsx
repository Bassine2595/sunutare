import React, { useState } from "react";
import { Card, Button, Alert, Statistic } from "antd";
import { checKMail } from "../../Service";

const { Countdown } = Statistic;

export const Activate = ({ mail, token }) => {
  const [sendBack, setSendBack] = useState(true);
  const [deadline, setDeadline] = useState(null);
  const onClickActivate = () => {
    setSendBack(false);
    setDeadline(Date.now() + 30 * 60 * 60);
    checKMail({
      url: `${process.env.REACT_APP_ROOT}/activate/${token}`,
      mail: mail,
      message:
        "Votre compte sunutare a été créé avec succès Vous devez maintenant l'activer pour être en mesure de vous connecter. ",
    });
  };

  return (
    <Card hoverable>
      <Alert
        style={{ marginBottom: 10 }}
        showIcon
        type="info"
        message="Votre compte n'est pas active !"
      />
      {sendBack ? (
        <Button type="primary" onClick={onClickActivate}>
          J'active mon compte
        </Button>
      ) : (
        <Countdown
          value={deadline}
          onFinish={() => setSendBack(true)}
          format="mm:ss"
        />
      )}
    </Card>
  );
};
