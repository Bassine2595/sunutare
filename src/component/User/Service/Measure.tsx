import React from "react";
import { MeasureForm } from "../Measure/Form";

export const Measure = ({ onFinish, customer }) => {
  return (
    <MeasureForm
      onFinish={onFinish}
      initialValues={customer?.measureById}
      loading={false}
    />
  );
};
