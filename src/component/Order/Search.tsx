import React from "react";
import { SearchForm } from "./Form";
import { Card } from "antd";

export const Search = () => {
  const onFinish = () => {};
  return (
    <Card title="Je suis ma commande !">
      <SearchForm onFinish={onFinish} />
    </Card>
  );
};
