import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.min.css";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { BrowserRouter } from "react-router-dom";

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
