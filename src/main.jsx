import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/theme.css";
import "./index.css";

// Mount the React tree into the DOM inside the root div.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
