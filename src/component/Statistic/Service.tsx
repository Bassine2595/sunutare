import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../Context";
import {
  ServicesCount,
  SERVICEDELIVEREDWITHIN7DAYS,
  NUMBEROFSERVICEPERDAYS,
  NUMBEROFSERVICEPERMONTHS,
  PRESSURERATE,
} from "../../Gql/Aggregate";
import { Card, Statistic, Spin } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
import { SerciceByMonth } from "./ServiceByMonth";
import { useModal } from "../../hooks/useModal";
import ReactEcharts from "echarts-for-react";
import _ from "lodash";

const ends = moment().add(1, "week");
const week = moment().startOf("week").add(1, "day");

const Config = {
  lineTension: 0.1,
  borderColor: "#1DA57A",
  pointBorderColor: "#1DA57A",
  pointHoverBackgroundColor: "#1DA57A",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

export const Count = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(ServicesCount, {
    variables: { workshopId: user.workshop.id },
  });
  return (
    <Card hoverable loading={loading}>
      {data && (
        <Statistic
          title="Service en cours"
          value={data.services.totalCount}
          suffix={<ShoppingOutlined style={{ fontSize: 30 }} />}
        />
      )}
    </Card>
  );
};

export const DeliveredWithin7Days = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(SERVICEDELIVEREDWITHIN7DAYS, {
    variables: { workshopId: user.workshop.id, ends },
  });
  return (
    <Card hoverable loading={loading}>
      {data && (
        <Statistic
          title={`Nombre de services à livrer avant le ${ends.format(
            "DD/MM/YYYY"
          )}`}
          value={data.services.totalCount}
          suffix={<ShoppingOutlined style={{ fontSize: 30 }} />}
        />
      )}
    </Card>
  );
};

export const NumberOfServicePerDays = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(NUMBEROFSERVICEPERDAYS, {
    variables: { workshopId: user.workshop.id },
  });
  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "DD MMM",
            displayFormats: {
              day: "DD MMM",
            },
          },
        },
      ],
    },
  };
  return (
    <Card hoverable loading={loading} title="Nombre de services par jour">
      {data && (
        <Line
          height={157}
          data={{
            labels: data.all.nodes.map(({ day }) => day),
            datasets: [
              {
                ...Config,
                data: data.all.nodes.map(({ count }) => count),
              },
            ],
          }}
          options={options}
        />
      )}
    </Card>
  );
};

export const NumberOfServicePerMonths = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(NUMBEROFSERVICEPERMONTHS, {
    variables: { workshopId: user.workshop.id },
  });
  const [month, setMonth] = useState();
  const [visible, toggle] = useModal();
  const onElementsClick = ([item]) => {
    if (item) {
      setMonth(data.all.nodes[item._index].month);
      toggle();
    }
  };

  const options = {
    legend: {
      display: false,
    },
    onClick: (_, item) => onElementsClick(item),
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM",
            displayFormats: {
              day: "MMM",
            },
          },
        },
      ],
    },
  };

  return (
    <Card
      hoverable
      loading={loading}
      title="Nombre de services en fonction des mois"
    >
      {month && (
        <SerciceByMonth month={month} visible={visible} onCancel={toggle} />
      )}
      {data && (
        <Bar
          height={157}
          data={{
            labels: data.all.nodes.map(({ month }) => month),
            datasets: [
              {
                data: data.all.nodes.map(({ count }) => count),
              },
            ],
          }}
          options={options}
        />
      )}
    </Card>
  );
};

export const PressureRate = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(PRESSURERATE, {
    variables: { workshopId: user.workshop.id, week },
  });

  const percent = () => {
    return (
      (100 * data?.numberOfServiceToStartDuringWeeks?.nodes[0]?.count) /
      data?.averageNumberOfServicesPerWeeks?.nodes[0]?.avg
    );
  };
  return (
    <Card title="Taux de pression">
      {loading ? (
        <Spin />
      ) : (
        <ReactEcharts
          option={{
            series: [
              {
                type: "gauge",
                detail: { formatter: "{value}%" },
                data: [
                  {
                    value: _.isNaN(percent()) ? 0 : percent(),
                  },
                ],
                axisLabel: {
                  show: false,
                },
              },
            ],
          }}
        />
      )}
    </Card>
  );
};
