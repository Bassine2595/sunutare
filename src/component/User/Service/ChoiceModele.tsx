import React, { useContext } from "react";
import { UserContext } from "../../Context";
import { MODELES } from "../../../Gql/Query";
import { Card, Button, Modal, Carousel, Divider, message, List } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UploadOutlined } from "@ant-design/icons";
import { FormFilter, AddModeleForm } from "../Modele/Form";
import { CREATEMODELE } from "../../../Gql/Mutation";
import { useModal } from "../../../hooks/useModal";
import { useMediaQuery } from "react-responsive";

export const ChoiceModele = ({ onChoice }) => {
  const { user } = useContext(UserContext);
  const [visible, toggle] = useModal();
  const { data, loading, refetch } = useQuery(MODELES, {
    variables: { workshopId: user.workshop.id },
  });

  const onFinish = (values) => {
    refetch({ ...values });
  };
  const isSm = useMediaQuery({ query: "(max-width: 576px)" });

  return (
    <Card
      bordered={false}
      loading={loading}
      bodyStyle={{
        overflow: "auto",
        height: 700,
      }}
      extra={
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => {
            toggle();
          }}
        >
          Autre modèle
        </Button>
      }
    >
      <ChoiceOtherModel
        visible={visible}
        onCancel={toggle}
        onSuccess={({ modele }) => {
          onChoice(modele);
          toggle();
        }}
        onError={() => {
          toggle();
          message.error("Une erreur est survenue !");
        }}
      />
      {!isSm && <FormFilter onFinish={onFinish} />}
      <Divider />
      {!loading && (
        <List
          grid={{ gutter: 12, xs: 1, sm: 2, md: 2, lg: 4 }}
          rowKey="id"
          dataSource={data?.modeles.nodes}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                key={item.id}
                cover={
                  <Carousel autoplay>
                    {item.imageFile.map(({ name, url }, key) => (
                      <img key={key} height={300} alt={name} src={url} />
                    ))}
                  </Carousel>
                }
              >
                <Button
                  block
                  key="choice"
                  type="primary"
                  onClick={() => onChoice(item)}
                >
                  Choisir
                </Button>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

const ChoiceOtherModel = ({ visible, onCancel, onSuccess, onError }) => {
  const [createModele, { loading }] = useMutation(CREATEMODELE);

  const onFinish = ({ action, ...rest }) => {
    createModele({
      variables: { modele: { ...rest } },
    })
      .then(({ data: { createModele } }) => {
        onSuccess(createModele);
      })
      .catch((error) => {
        onError(error);
      });
  };
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <AddModeleForm onFinish={onFinish} loading={loading} />
    </Modal>
  );
};
