import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { EmployersCount } from "../../Gql/Aggregate";
import { Statistic, Card } from "antd";
import { UserContext } from "../Context";
import { TeamOutlined } from "@ant-design/icons";

export const Count = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(EmployersCount, {
    variables: { workshopId: user.workshop.id },
  });
  return (
    <Card hoverable loading={loading}>
      {data && (
        <Statistic
          title="Nombre d'employés"
          value={data.employers.totalCount}
          suffix={<TeamOutlined style={{ fontSize: 30 }} />}
        />
      )}
    </Card>
  );
};
