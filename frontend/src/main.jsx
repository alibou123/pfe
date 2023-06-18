import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import AppContext from "./contexts/AppContext";
import frFR from "antd/lib/locale/fr_FR";
import App from "./App";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import "./index.css";

dayjs.locale("fr");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f5333f",
        },
      }}
      locale={frFR}
    >
      <AppContext>
        <App />
      </AppContext>
    </ConfigProvider>
  </BrowserRouter>
);
