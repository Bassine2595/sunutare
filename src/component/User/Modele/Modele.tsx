import React, { useState, useContext } from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { Row, Col, Card, message, PageHeader, Button, Skeleton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MODELES } from "../../../Gql/Query";
import { UserContext } from "../../Context";
import { Display } from "./Display";
import { Add } from "./Add";
import { FormFilter } from "./Form";
import { DELETEMODELE } from "../../../Gql/Mutation";
import { Update } from "./Update";
import { useModal } from "../../../hooks/useModal";
import { deleteConfirm } from "../../Shared/Confirm";
import { useMediaQuery } from "react-responsive";

export const Modele = () => {
  const { user } = useContext(UserContext);
  const { data, loading, refetch } = useQuery(MODELES, {
    variables: {
      workshopId: user.workshop?.id,
    },
  });
  const [deleteModele] = useMutation(DELETEMODELE);
  const [modele, setModele] = useState();
  const [addModal, addModalToggle] = useModal();
  const [updateModal, updateModalToggle] = useModal();
  const isSm = useMediaQuery({ query: "(max-width: 576px)" });
  const isMd = useMediaQuery({ query: "(max-width: 768px)" });

  const onFinish = (values) => {
    refetch({
      ...values,
    });
  };
  const onDelete = (id) => {
    deleteConfirm({
      onCancel: null,
      onOk: () => {
        deleteModele({ variables: { id } }).then(() => {
          message.success("modele supprimé avec succès !");
          refetch();
        });
      },
    });
  };

  return (
    <Theme>
      <Row justify="center">
        <Col xs={24}>
          <Add
            visible={addModal}
            onCancel={addModalToggle}
            onError={() => {
              message.error("Une erreu est suvenue réessayer plus tard !");
            }}
            onSuccess={() => {
              addModalToggle();
              message.success("Ajout réussi !");
              refetch();
            }}
          />
          <Update
            visible={updateModal}
            onCancel={() => updateModalToggle()}
            onError={() => {
              message.error("Une erreu est suvenue réessayer plus tard !");
            }}
            onSuccess={() => {
              message.success("Modèle modifier avec succès !");
              updateModalToggle();
              refetch();
            }}
            modele={modele}
          />
          <PageHeader
            ghost={false}
            title="Modeles"
            onBack={() => window.history.back()}
            extra={[
              <Button
                type="primary"
                shape="round"
                onClick={addModalToggle}
                key="add"
                icon={<PlusCircleOutlined />}
              >
                {!isMd && "Ajouter un modele"}
              </Button>,
            ]}
          />
          {!isSm && (
            <Card style={{ marginBottom: 20 }} title="Filtre">
              <FormFilter onFinish={onFinish} />
            </Card>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <Row gutter={[24, 24]}>
              {data?.modeles.nodes.map((modele) => (
                <Col xs={24} sm={24} md={12} lg={6} key={modele.id}>
                  <Display
                    {...modele}
                    onDelete={onDelete}
                    onEdit={() => {
                      setModele(modele);
                      updateModalToggle();
                    }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Theme>
  );
};
