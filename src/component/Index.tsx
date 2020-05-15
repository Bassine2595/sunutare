import React, { useContext, useState } from "react";
import { PresentationLayout } from "./Shared/PresentationLayout";
import {
  Row,
  Col,
  Card,
  Typography,
  Skeleton,
  Tag,
  Modal,
  Form,
  Alert,
} from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UserContext } from "./Context";
import { EMPLOYERSBYWORKSHOPID } from "../Gql/Query";
import manager from "../imgs/manager.svg";
import employer from "../imgs/office-worker.svg";
import { ButtonLogin, ButtonCancel } from "./Shared/Button";
import { useModal } from "../hooks/useModal";
import { FormItemPassword } from "./Shared/Input";
import { useForm } from "antd/lib/form/util";
import { CHECKPASSWORD } from "../Gql/Mutation";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

interface ProfilProps {
  id: string;
  fullName: string;
  isManager?: boolean;
  onSelected: (id: string) => void;
}

interface CheckPasswordProps {
  user: string;
  visible: boolean;
  onCancel: () => void;
  onCheck: (token: string) => void;
}

const Profil = ({
  id,
  fullName,
  isManager = false,
  onSelected,
}: ProfilProps) => {
  return (
    <Card
      size="small"
      extra={<Tag color="#1DA57A">{isManager ? "Directeur" : "Employé"}</Tag>}
      onClick={() => onSelected(id)}
      cover={
        <img alt={fullName} src={isManager ? manager : employer} height={200} />
      }
      hoverable
    >
      <Card.Meta title={fullName} />
    </Card>
  );
};

const CheckPassword = ({
  user,
  visible,
  onCancel,
  onCheck,
}: CheckPasswordProps) => {
  const [form] = useForm();
  const [message, setMessage] = useState("");
  const [checkPassword, { loading }] = useMutation(CHECKPASSWORD);

  const onFinishi = (password) => {
    checkPassword({ variables: { password, id: user } })
      .then(
        ({
          data: {
            checkPassword: { jwtToken },
          },
        }) => {
          if (jwtToken) {
            onCheck(jwtToken);
          } else {
            setMessage("Mauvais mot de passe !");
          }
        }
      )
      .catch((error) => {
        console.log(error);
        setMessage("Une erreur est survenue !");
      });
  };

  return (
    <Modal
      closable={false}
      title="Se connecter"
      visible={visible}
      footer={[
        <ButtonLogin
          loading={loading}
          key="login"
          onClick={() => {
            form
              .validateFields()
              .then(({ password }) => onFinishi(password))
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        />,
        <ButtonCancel key="cancel" onClick={onCancel} />,
      ]}
    >
      {message !== "" && (
        <Alert
          message={message}
          type="info"
          showIcon
          closable
          style={{ marginBottom: 10 }}
        />
      )}
      <Form form={form}>
        <FormItemPassword />
      </Form>
    </Modal>
  );
};

const Index = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { data, loading } = useQuery(EMPLOYERSBYWORKSHOPID, {
    variables: { workshopId: user.workshop.id },
  });
  const [current, setCurrent] = useState(null);
  const [visible, toggle] = useModal();

  const onCheck = (token: string) => {
    toggle();
    localStorage.setItem("user", token);
    history.push("/employer/service");
  };

  return (
    <PresentationLayout>
      <div style={{ textAlign: "center" }}>
        <Title>Qui est-ce ?</Title>
      </div>
      <Skeleton loading={loading} active>
        <Row justify="center" gutter={[12, 12]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Profil
              onSelected={(id) => {
                setCurrent(id);
                toggle();
              }}
              isManager={true}
              id={user.workshop.id}
              fullName={`${user.gender}. ${user.firstName} ${user.lastName}`}
            />
          </Col>
          {data?.employers.nodes.map(({ id, fullName }) => (
            <Col key={id} xs={24} sm={12} md={8} lg={6}>
              <Profil
                onSelected={(id) => {
                  setCurrent(id);
                  toggle();
                }}
                id={id}
                fullName={fullName}
              />
            </Col>
          ))}
        </Row>
      </Skeleton>
      {current && (
        <CheckPassword
          onCheck={onCheck}
          user={current}
          visible={visible}
          onCancel={toggle}
        />
      )}
    </PresentationLayout>
  );
};

export default Index;
