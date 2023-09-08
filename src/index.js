import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";

// This is where React attaches the component to the root element in the index.html file.
// StrictMode allows React to display and handle any errors/warnings that may occur.
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
