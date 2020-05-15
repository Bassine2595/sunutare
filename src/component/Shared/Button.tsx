import React from "react";
import { Button } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  SaveOutlined,
  FilterOutlined,
  LoginOutlined,
  UserAddOutlined,
  SearchOutlined,
  HomeOutlined,
  SendOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { ButtonProps } from "antd/lib/button";

export const ButtonEdit = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<EditOutlined />}>
    Modifier
  </Button>
);

export const ButtonSave = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<SaveOutlined />}>
    Enregistrer
  </Button>
);

export const ButtonCheck = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<CheckCircleOutlined />}>
    Valider
  </Button>
);

export const ButtonCancel = (props: ButtonProps) => {
  return (
    <Button {...props} icon={<CloseCircleOutlined />}>
      Annuler
    </Button>
  );
};
export const ButtonSend = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<SendOutlined />}>
    Envoyer
  </Button>
);

export const ButtonSearch = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<SearchOutlined />}>
    Rechercher
  </Button>
);

export const ButtonFilter = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<FilterOutlined />}>
    Filtrer
  </Button>
);

export const ButtonLogin = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<LoginOutlined />}>
    Se connecter
  </Button>
);

export const ButtonRegister = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<UserAddOutlined />}>
    S'inscrire
  </Button>
);

export const ButtonHome = (props: ButtonProps) => (
  <Button {...props} type="primary" icon={<HomeOutlined />}>
    Accueil
  </Button>
);
