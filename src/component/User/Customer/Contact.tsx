import { Modal, message } from "antd";
import React, { useContext } from "react";
import { ContactForm } from "./Form";
import { MESSAGEBYSUBJECT } from "../../../Gql/Query";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../../Context";
import { ContactClienBytMail } from "../../../Service";
import { ButtonSend, ButtonCancel } from "../../Shared/Button";
import { useForm } from "antd/lib/form/util";

export const Contact = ({
  customer,
  visible,
  onCancel,
  onSuccess,
  onError,
}) => {
  const { data, loading } = useQuery(MESSAGEBYSUBJECT, {
    variables: { subject: "Info" },
  });
  console.log(data);
  const [form] = useForm();
  const { user } = useContext(UserContext);
  const onFinish = () => {
    form
      .validateFields()
      .then(({ subject }) => {
        ContactClienBytMail({
          mail: customer.mail,
          name: customer?.fullName,
          message:
            subject === "Nouveautés"
              ? data?.messages.nodes[1].message
                  .replace("{fullName}", customer?.fullName)
                  .replace("{workshopName}", user.workshop.name)
              : data?.messages.nodes[0].message
                  .replace("{fullName}", customer?.fullName)
                  .replace("{workshopName}", user.workshop.name),

          subject: subject,
          url:
            subject == "Nouveautés"
              ? `${process.env.REACT_APP_ROOT}/galerie`
              : ``,
        })
          .then((res) => {
            onSuccess(res);
            console.log(res);
          })
          .catch((err) => {
            onError(err);
            console.log(err);
          });
      })
      .catch((info) => {
        console.log(info);
      });
  };

  return (
    <Modal
      closable={false}
      visible={visible}
      bodyStyle={{ margin: 20 }}
      width={600}
      footer={[
        <ButtonSend key="send" onClick={onFinish} />,
        <ButtonCancel key="cancel" onClick={onCancel} />,
      ]}
      title="Contacter vos clients"
    >
      <ContactForm
        form={form}
        initialValues={customer}
        /* messages={data?.messages.nodes.map(({ id, message }) => ({
          id: id,
          message: message

            .replace("{fullName}", customer?.fullName)
            .replace("{workshopName}", user.workshop.name),
        }))}*/
      />
    </Modal>
  );
};
