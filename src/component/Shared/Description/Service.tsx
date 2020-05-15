import React from "react";
import { Descriptions, Tag } from "antd";
import moment from "moment";
import { ServiceModele } from "../../../modeles/Service";

export const ServiceDescription = ({
  employes,
  comment,
  dateBegin,
  dateFinish,
}) => {
  return (
    <Descriptions title="Service" bordered size="small" column={1}>
      {employes.nodes.map(({ fullName }, key) => (
        <Descriptions.Item label="Reponsable" key={key}>
          {fullName}
        </Descriptions.Item>
      ))}
      <Descriptions.Item label="Date de démarrage">
        {moment(dateBegin).format("DD MMM YYYY")}
      </Descriptions.Item>
      <Descriptions.Item label="Date de livraison">
        {moment(dateFinish).format("DD MMM YYYY")}
      </Descriptions.Item>
      {comment && (
        <Descriptions.Item label="Commentaires">{comment}</Descriptions.Item>
      )}
    </Descriptions>
  );
};

export const ServicePriceDescription = ({ price, avance }: ServiceModele) => {
  return (
    <Descriptions title="Infos sur le service" column={1}>
      <Descriptions.Item>
        <Tag color="#1DA57A">{`Prix: ${price} CFA`}</Tag>
      </Descriptions.Item>
      <Descriptions.Item>
        <Tag color="#1DA57A">{`1er Versement: ${avance} CFA`}</Tag>
      </Descriptions.Item>
      <Descriptions.Item>
        <Tag color="#1DA57A">{`Montant restant: ${price - avance} CFA`}</Tag>
      </Descriptions.Item>
    </Descriptions>
  );
};
