import React, { useState } from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { Row, Col, Button, Modal, message, PageHeader } from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MODELE } from "../../../Gql/Query";
import { DELETEMODELE, UPDATEMODELE } from "../../../Gql/Mutation";
import { ModeleCarousel } from "../Carousel";
import { useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

function showConfirm(cb) {
  confirm({
    title: "Do you Want to delete these items?",
    content: "Some descriptions",
    onOk() {
      cb();
    },
  });
}

export const Show = ({ id }) => {
  const [updateModele] = useMutation(UPDATEMODELE);
  const [deleteModele] = useMutation(DELETEMODELE);
  const { data, loading } = useQuery(MODELE, { variables: { id } });
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const onFinishAddOrEditModele = ({ action, ...rest }) => {
    const {
      modele: { id },
    } = data;
    updateModele({
      variables: {
        input: { patch: rest, id },
      },
    })
      .then(() => {
        setVisible((visible) => !visible);
        message.success("succès !");
      })
      .catch((error) => {
        console.log(error);
        message.error("erreur !");
      });
  };

  const onClickDelete = (id) => {
    showConfirm(() => {
      deleteModele({ variables: { id } })
        .then(() => {
          history.push("/modele");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    !loading && (
      <Theme>
        <PageHeader
          style={{ marginBottom: 20 }}
          ghost={false}
          title="Modele"
          onBack={() => window.history.back()}
          extra={[
            <Button
              type="link"
              onClick={() => setVisible((visible) => !visible)}
              icon={<EditOutlined />}
              key="edit"
            />,
            <Button
              type="link"
              onClick={() => onClickDelete(data.modele.id)}
              icon={<DeleteOutlined />}
              key="delete"
            />,
          ]}
        />
        <Row justify="center">
          <Col xs={24} sm={24} md={10}>
            <Modal
              footer={null}
              visible={visible}
              onCancel={() => {
                setVisible((visible) => !visible);
              }}
            ></Modal>
            <ModeleCarousel {...data.modele} />
          </Col>
        </Row>
      </Theme>
    )
  );
};
