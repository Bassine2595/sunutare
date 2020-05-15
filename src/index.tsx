import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Client from "./Client";
import { Auth } from "./Service";
import frFR from "antd/es/locale/fr_FR";
import { ConfigProvider } from "antd";
import { ApolloProvider } from "@apollo/react-hooks";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const client = Client({ token: Auth.getJeton() });

ReactDOM.render(
  <ConfigProvider locale={frFR}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
