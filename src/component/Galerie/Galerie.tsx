import React, { useState } from "react";
import { CustomerLayout } from "../Shared/CustomerLayout";
import { useQuery } from "@apollo/react-hooks";
import { MODELES } from "../../Gql/Query";
import { Photos } from "./Photos";
import { Loading } from "../Shared/Loading";
import { Affix, Button, Card } from "antd";
import { FilterOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FormFilter } from "./Form";

export const Galerie = () => {
  const { data, loading, refetch } = useQuery(MODELES);
  const [values, setValues] = useState();
  const [hide, toggle] = useState(true);

  const onFinish = (values) => {
    refetch({
      ...values,
    });
    setValues(values);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <CustomerLayout>
      {!hide && (
        <Affix style={{ position: "fixed", top: 120, right: 30, zIndex: 2 }}>
          <Card hoverable size="small">
            <FormFilter initialValues={values} onFinish={onFinish} />
          </Card>
        </Affix>
      )}
      <Affix style={{ position: "fixed", top: 80, right: 30, zIndex: 2 }}>
        <Button
          onClick={() => toggle((hide) => !hide)}
          shape="round"
          type={hide ? "primary" : "danger"}
          icon={hide ? <FilterOutlined /> : <CloseCircleOutlined />}
        >
          {hide ? "Filtrer" : "Fermer"}
        </Button>
      </Affix>
      <Photos
        photos={data?.modeles.nodes.map(({ imageFile }) => ({
          src: imageFile[0].url,
          height: 2,
          width: 1,
        }))}
      />
    </CustomerLayout>
  );
};
