import React, { useContext } from "react";
import { NotificationOutlined } from "@ant-design/icons";
import { Button, Badge } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../Context";
import { NOTIFICATIONS } from "../../Gql/Query";
import { useHistory } from "react-router-dom";

export const Notification = () => {
  const { user } = useContext(UserContext);
  const { data } = useQuery(NOTIFICATIONS, {
    variables: { workshopId: user.workshop.id },
  });
  const history = useHistory();
  return (
    <Badge count={data?.notifications.totalCount}>
      <Button
        type="link"
        icon={<NotificationOutlined />}
        onClick={() => history.push("/notification")}
      />
    </Badge>
  );
};
