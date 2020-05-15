import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  PageHeader,
  message,
  List,
  Button,
  Skeleton,
  Card,
} from "antd";
import { UserContext } from "../../Context";
import { useQuery } from "@apollo/react-hooks";
import { CUSTOMERSBYWORKSHOPID } from "../../../Gql/Query";
import { Display } from "./Display";
import { FilterForm } from "./Form";
import { Contact as ContactModal } from "./Contact";
import { useModal } from "../../../hooks/useModal";
import { Theme } from "../../Shared/ManagerLayout";

export const Customer = () => {
  const { user } = useContext(UserContext);
  const { data, loading, refetch } = useQuery<any>(CUSTOMERSBYWORKSHOPID, {
    variables: { workshopId: user.workshop.id, all: true },
  });
  const [current, setCurrent] = useState();

  const [visible, toggle] = useModal();

  const onContact = (customer) => {
    setCurrent(customer);
    toggle();
  };
  const onSearch = (value) => {
    refetch({ like: value });
  };
  return (
    <Theme>
      <ContactModal
        customer={current}
        visible={visible}
        onCancel={toggle}
        onSuccess={() => {
          toggle();
          message.success("Message envoyé avec success !");
          refetch();
        }}
        onError={() => {
          toggle();
          message.error("Une erreur est survenue, réessayer plus tard !");
        }}
      />

      <Card>
        <FilterForm onSearch={onSearch} />
      </Card>
      <Card>
        <List
          rowKey="id"
          dataSource={data?.customers.nodes}
          renderItem={(customer: any, key) => {
            return (
              <Display
                {...customer}
                numberServicesByYear={
                  data?.numberServicesByYears.nodes[0].count
                }
                onContact={onContact}
              />
            );
          }}
        />
      </Card>
    </Theme>
  );
};
