import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const deleteConfirm = ({ onOk, onCancel }) => {
  confirm({
    title: "Êtes-vous sûr de continuer la suppression ?",
    icon: <ExclamationCircleOutlined />,
    okText: "Oui",
    okType: "danger",
    cancelText: "Non",
    onOk() {
      onOk();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};
export const logoutConfirm = ({ onOk, onCancel }) => {
  confirm({
    title: "Êtes-vous sûr de voulir vous deconnecter  ?",
    icon: <ExclamationCircleOutlined />,
    okText: "Oui",
    okType: "danger",
    cancelText: "Non",
    onOk() {
      onOk();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};
