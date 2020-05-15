import React from "react";
import { Tag, Descriptions } from "antd";

export const MeasureDescription = ({
  width,
  breasts,
  hips,
  length,
  longSleeve,
  lowsLeeve,
  pants,
  belt,
}) => {
  return (
    <Descriptions
      title="Mesure"
      bordered
      size="small"
      column={{ sm: 2, xs: 1 }}
    >
      {length && (
        <Descriptions.Item label="Longueur">
          <Tag color="#1DA57A">{length} cm</Tag>
        </Descriptions.Item>
      )}
      {width && (
        <Descriptions.Item label="Largeur">
          {<Tag color="#1DA57A">{width} cm</Tag>}
        </Descriptions.Item>
      )}
      {pants && (
        <Descriptions.Item label="Pantalon">
          {<Tag color="#1DA57A">{pants} cm</Tag>}
        </Descriptions.Item>
      )}
      {breasts && (
        <Descriptions.Item label="Bassin">
          {<Tag color="#1DA57A">{breasts} cm</Tag>}
        </Descriptions.Item>
      )}
      {longSleeve && (
        <Descriptions.Item label="Longue manche">
          {<Tag color="#1DA57A">{longSleeve} cm</Tag>}
        </Descriptions.Item>
      )}
      {lowsLeeve && (
        <Descriptions.Item label="Courte manche">
          {<Tag color="#1DA57A">{lowsLeeve} cm</Tag>}
        </Descriptions.Item>
      )}
      {hips && (
        <Descriptions.Item label="Hanche">
          {<Tag color="#1DA57A">{hips} cm</Tag>}
        </Descriptions.Item>
      )}
      {belt && (
        <Descriptions.Item label="Ceinture">
          <Tag color="#1DA57A">{belt} cm</Tag>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
