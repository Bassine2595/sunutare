import React, { useContext, useState } from "react";
import { Theme } from "../../Shared/ManagerLayout";
import { Row, Col, PageHeader, message, List, Button, Skeleton } from "antd";
import { UserContext } from "../../Context";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Add } from "./Add";
import { useQuery } from "@apollo/react-hooks";
import { EMPLOYERSBYWORKSHOPID } from "../../../Gql/Query";
import { useModal } from "../../../hooks/useModal";
import { Show } from "./Show";
import { Make } from "./Make";
import { Display } from "./Display";
import { EditEmployer } from "./Update";

export const Employer = () => {
  const { user } = useContext(UserContext);
  const { data, loading, refetch } = useQuery(EMPLOYERSBYWORKSHOPID, {
    variables: { workshopId: user.workshop.id },
  });
  const [key, setKey] = useState(0);
  const [employer, setEmployer] = useState();
  const [addModal, addModalToggle] = useModal();
  const [showModal, showModalToggle] = useModal();
  const [makeModal, makeModalToggle] = useModal();
  const [editModal, editModalToggle] = useModal();

  const onClickShow = (employer) => {
    setEmployer(employer);
    showModalToggle();
  };

  const onClickMake = (employer) => {
    setEmployer(employer);
    makeModalToggle();
  };
  const onClickEdit = (employer) => {
    setEmployer(employer);
    editModalToggle();
  };

  return (
    <Theme>
      <Add
        key={key}
        visible={addModal}
        onSuccess={() => {
          addModalToggle();
          message.success("Employé ajouté avec succès !");
          refetch();
          setKey((key) => key + 1);
        }}
        onError={(e) => {
          addModalToggle();
          message.error("Une erreur est survenue, réessayer plus tard !");
        }}
        onCancel={addModalToggle}
      />
      {employer && (
        <Show
          visible={showModal}
          onCancel={showModalToggle}
          employer={employer}
        />
      )}
      {employer && (
        <Make
          visible={makeModal}
          onCancel={makeModalToggle}
          employer={employer}
        />
      )}
      {employer && (
        <EditEmployer
          employer={employer}
          visible={editModal}
          onCancel={editModalToggle}
          onSuccess={() => {
            editModalToggle();
            message.success("Les informations de l'employé ont été modifié !");
            refetch();
          }}
          onError={() => {
            editModalToggle();
            message.error("Une erreur est survenue, réessayer plus tard !");
            refetch();
          }}
        />
      )}
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <PageHeader
            style={{ marginBottom: 20 }}
            ghost={false}
            title="Employés"
            onBack={() => window.history.back()}
            extra={
              <Button
                onClick={addModalToggle}
                type="primary"
                shape="round"
                key="add"
                icon={<PlusCircleOutlined />}
              >
                Ajouter un employé
              </Button>
            }
          />
          {loading ? (
            <Skeleton />
          ) : (
            <List
              rowKey="id"
              grid={{ gutter: 8, xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
              dataSource={data?.employers.nodes}
              renderItem={(employer: any, key) => {
                return (
                  <List.Item key={key}>
                    <Display
                      {...employer}
                      onClickEdit={onClickEdit}
                      onClickMake={onClickMake}
                      onClickShow={onClickShow}
                    />
                  </List.Item>
                );
              }}
            />
          )}
        </Col>
      </Row>
    </Theme>
  );
};
