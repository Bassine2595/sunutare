import React, { useState } from "react";
import { Input, Card, Tag, Space, Divider, notification } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MESSAGEBYSUBJECT } from "../../Gql/Query";
import { ButtonSend } from "../Shared/Button";
import { ADDALERT } from "../../Gql/Mutation";

const { TextArea } = Input;

export const Reminder = ({ id }) => {
  const [key, setKey] = useState(0);
  const [current, setCurrent] = useState(null);
  const [addNotification, options] = useMutation(ADDALERT);
  const { data, loading } = useQuery(MESSAGEBYSUBJECT, {
    variables: { subject: "Relance" },
  });

  const onChange = ({ target: { value } }) => {
    setCurrent({ messageId: null, message: value });
  };

  const onFinish = () => {
    if (!current?.message) {
      notification.info({ message: "Le message est obligatoire !" });
    } else {
      addNotification({
        variables: {
          input: { ...current, serviceId: id, typeNotification: "RAPPELLE" },
        },
      })
        .then(() => {
          notification.success({
            message: "Votre relance a été pris en compte !",
          });
          setKey((key) => key + 1);
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Une erreur est survenue. Veillez réessayer plus tard !",
          });
        });
    }
  };

  return (
    <Card loading={loading} key={key}>
      <TextArea rows={1} value={current?.message} onChange={onChange} />
      <Divider />
      <Space direction="vertical">
        {data?.messages.nodes.map(({ id, message }) => (
          <Tag
            key={id}
            color="#1DA57A"
            style={{ cursor: "pointer", width: "100%", borderRadius: 5 }}
            onClick={() => setCurrent({ messageId: id, message })}
          >
            {message}
          </Tag>
        ))}
      </Space>
      <Divider />
      <ButtonSend type="primary" onClick={onFinish} loading={options.loading} />
    </Card>
  );
};
