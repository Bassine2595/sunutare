import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../Context";
import { ModelesCount } from "../../Gql/Aggregate";
import { Card, Statistic } from "antd";
import { FileImageOutlined } from "@ant-design/icons";

export const Count = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(ModelesCount, {
    variables: { workshopId: user.workshop.id },
  });
  return (
    <Card hoverable loading={loading}>
      {data && (
        <Statistic
          title="Nombre de modèle"
          value={data.modeles.totalCount}
          suffix={<FileImageOutlined style={{ fontSize: 30 }} />}
        />
      )}
    </Card>
  );
};
