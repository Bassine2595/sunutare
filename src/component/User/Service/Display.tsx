import React, { useState } from "react";
import {
  Card,
  Tag,
  Menu,
  Dropdown,
  List,
  Avatar,
  Progress,
  Carousel,
  Radio,
} from "antd";
import {
  ScissorOutlined,
  EyeOutlined,
  SmallDashOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  followModalToggle,
  currentService,
  showModalToggle,
  editModalToggle,
  deliverModalToggle,
} from "../../../reducers/service/Reducer";
import { ServiceModele } from "../../../modeles/Service";

type ServiceProps = {
  service: ServiceModele;
  noExtra?: boolean;
};

export const Service = ({ service, noExtra = false }: ServiceProps) => {
  const { id, code, modele, imageFile, progress, isOver } = service;
  const [type, setType] = useState("modele");
  const dispatch = useDispatch();
  return (
    <Card
      key={id}
      title={<Tag color="#1DA57A">{`Code service: ${code}`}</Tag>}
      cover={
        <Carousel autoplay>
          {type === "modele" && modele.imageFile.length > 0
            ? modele.imageFile.map(({ url, name }, key) => (
                <img key={key} alt={name} height={300} src={url} />
              ))
            : imageFile.length > 0 &&
              imageFile.map(({ url, name }, key) => (
                <img key={key} alt={name} height={300} src={url} />
              ))}
        </Carousel>
      }
      extra={
        !noExtra && (
          <Dropdown
            overlay={
              <Menu>
                {!isOver && (
                  <Menu.Item
                    onClick={() => {
                      dispatch(currentService(service));
                      dispatch(followModalToggle());
                    }}
                  >
                    <ScissorOutlined />
                    <span> Valider une étape</span>
                  </Menu.Item>
                )}
                {isOver && (
                  <Menu.Item onClick={() => dispatch(deliverModalToggle())}>
                    <ScissorOutlined />
                    <span> Livrer</span>
                  </Menu.Item>
                )}
                <Menu.Item
                  onClick={() => {
                    dispatch(currentService(service));
                    dispatch(showModalToggle());
                  }}
                >
                  <EyeOutlined />
                  <span>Voir</span>
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    dispatch(currentService(service));
                    dispatch(editModalToggle());
                  }}
                >
                  <EditOutlined />
                  <span>Modifier</span>
                </Menu.Item>
              </Menu>
            }
          >
            <SmallDashOutlined />
          </Dropdown>
        )
      }
    >
      <Radio.Group
        buttonStyle="solid"
        value={type}
        size="small"
        onChange={({ target: { value } }) => setType(value)}
      >
        <Radio.Button value="tissu">Tissu</Radio.Button>
        <Radio.Button value="modele">Modele</Radio.Button>
      </Radio.Group>
      <Card.Meta
        title="Progression"
        description={<Progress percent={progress} />}
      />
    </Card>
  );
};

export const ServiceResumeList = ({ data }) => {
  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      style={{ margin: 20, overflow: "auto", height: 500 }}
      bordered={false}
      renderItem={({
        dateBegin,
        dateFinish,
        imageFile: [{ url }],
        progress,
      }) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar size={64} shape="square" src={url} />}
          />
          <List.Item.Meta
            title="Début"
            description={moment(dateBegin).format("DD MMM")}
          />
          <List.Item.Meta
            title="Fin"
            description={moment(dateFinish).format("DD MMM")}
          />
          <List.Item.Meta
            title="Progression"
            description={<Progress percent={progress} />}
          />
        </List.Item>
      )}
    />
  );
};
