import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { client } from "./api";
import App from "./feature/App";
import "./styles/styles.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
