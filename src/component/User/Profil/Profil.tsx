import React, { useContext, useState } from "react";
import { Card, Row, Col, Menu, Tooltip, message, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  Password as UpdatePassword,
  Profil as UpdateProfil,
  Address as UpdateAddress,
} from "./Update";
import { UserContext } from "../../Context";
import { Auth } from "../../../Service";
import { useLocation, useHistory } from "react-router-dom";

export const Profil = () => {
  const { refetch } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState("profil");

  return (
    <Card>
      <Row>
        <Col span={2}>
          <Menu
            defaultSelectedKeys={["profil"]}
            mode="inline"
            theme="light"
            onClick={({ key }) => setSelected(key)}
          >
            <Menu.Item key="profil">
              <Tooltip placement="right" title="je modifie mes infos perso">
                <Button icon={<UserOutlined />} type="link" />
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="password">
              <Tooltip placement="right" title="je modifie mon mot de passe">
                <Button icon={<LockOutlined />} type="link" />
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="address">
              <Tooltip
                placement="right"
                title="je modifie mon adresse personnelle"
              >
                <Button icon={<EnvironmentOutlined />} type="link" />
              </Tooltip>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={22}>
          <Card bordered={false}>
            {selected === "profil" && (
              <UpdateProfil
                onSuccess={() => {
                  message.success(
                    "Informations personnelles modifiées avec succès !"
                  );
                  refetch();
                }}
                onError={() => {
                  message.error("Une erreur est survenue !");
                }}
              />
            )}
            {selected === "password" && (
              <UpdatePassword
                onSuccess={() => {
                  message.success("Mot de passe modifié avec succès !");
                  Auth.logout(() => {
                    history.push({
                      pathname: "/login",
                      state: { from: location },
                    });
                  });
                }}
                onError={() => {
                  message.error("Une erreur est survenue !");
                }}
              />
            )}
            {selected === "address" && (
              <UpdateAddress
                onSuccess={() => {
                  message.success("Adresse modifiée avec succès !");
                }}
                onError={() => {
                  message.error("Une erreur est survenue !");
                }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
