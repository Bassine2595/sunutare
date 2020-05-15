import React, { useState } from "react";
import { Card, Button, Carousel } from "antd";
import moment from "moment";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export const ModeleCarousel = ({ id, name, createdAt, imageFile }) => {
  const [carousel, setCarousel] = useState(null);
  return (
    <Card
      style={{ marginTop: 20 }}
      key={id}
      bordered={false}
      hoverable
      cover={
        <Carousel
          ref={(node) => {
            setCarousel(node);
          }}
        >
          {imageFile.map(({ filename }) => (
            <img
              key={filename}
              src={`${process.env.REACT_APP_BASE_URL_UPLOADS}/${filename}`}
              height="500"
            />
          ))}
        </Carousel>
      }
    >
      <Button
        type="link"
        onClick={() => carousel.next()}
        style={{ float: "right" }}
        icon={<ArrowRightOutlined />}
      />

      <Button
        type="link"
        onClick={() => carousel.prev()}
        icon={<ArrowLeftOutlined />}
      />
      <Card.Meta
        title={name}
        description={`Créé : ${moment(createdAt).calendar()}`}
      />
    </Card>
  );
};
