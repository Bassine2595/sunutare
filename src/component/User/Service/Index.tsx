import React, { useContext, useEffect } from "react";
import { Row, Col, Card, List } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../../Context";
import { SERVICES } from "../../../Gql/Query";
import { Theme } from "../../Shared/ManagerLayout";
import { Service } from "./Display";
import { FilterForm } from "./Form";
import { omit } from "lodash";
import { ServiceModele } from "../../../modeles/Service";
import { useSelector, useDispatch } from "react-redux";
import { ReducerType } from "../../../reducers/Reducer";
import { refetchableToggle } from "../../../reducers/service/Reducer";

export const Index = () => {
  const { user } = useContext(UserContext);
  const init = {
    workshopId: user.workshop.id,
    isStarded: undefined,
    isCut: undefined,
    isOver: undefined,
    isDelivered: undefined,
  };
  const { data, loading, refetch } = useQuery(SERVICES, {
    variables: init,
  });
  const { refetchable } = useSelector(
    ({ serviceModal }: ReducerType) => serviceModal
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (refetchable) {
      refetch();
      dispatch(refetchableToggle());
    }
  }, [refetch, dispatch, refetchable]);

  const onChange = ({ target: { value } }) => {
    switch (value) {
      case "start":
        refetch({ ...omit(init, "isStarded"), isStarded: true });
        break;
      case "cut":
        refetch({ ...omit(init, "isCut"), isCut: true });
        break;
      case "over":
        refetch({ ...omit(init, "isOver"), isOver: true });
        break;
      case "deliver":
        refetch({ ...omit(init, "isDelivered"), isDelivered: true });
        break;
      default:
        refetch(init);
        break;
    }
  };

  return (
    <Theme>
      <Card style={{ marginBottom: 20 }} title="Filtrer">
        <FilterForm onChange={onChange} />
      </Card>
      <Row>
        <Col span={24}>
          {data && (
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4 }}
              rowKey="id"
              loading={loading}
              renderItem={(data: ServiceModele) => (
                <List.Item>
                  <Service service={data} />
                </List.Item>
              )}
              dataSource={data.services.nodes}
            />
          )}
        </Col>
      </Row>
    </Theme>
  );
};
