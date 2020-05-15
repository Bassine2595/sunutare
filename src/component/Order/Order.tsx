import React from "react";
import { Row, Col, Skeleton } from "antd";
import { CustomerLayout } from "../Shared/CustomerLayout";
import { useParams } from "react-router-dom";
import { Search } from "./Search";
import { useQuery } from "@apollo/react-hooks";
import { SERVICEBYNODEID } from "../../Gql/Query";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Handle } from "./Handle";

export const Order = () => {
  const { node } = useParams();
  const { data, loading } = useQuery(SERVICEBYNODEID, {
    variables: { nodeId: node },
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mes commandes</title>
      </Helmet>
      <CustomerLayout>
        <Row justify="center">
          <Skeleton loading={loading} />
          <Col xs={24} md={16} lg={12}>
            {!node ? <Search /> : <Handle service={data?.serviceByNodeId} />}
          </Col>
        </Row>
      </CustomerLayout>
    </HelmetProvider>
  );
};
