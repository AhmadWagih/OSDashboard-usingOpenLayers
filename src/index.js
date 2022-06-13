import React from "react"; //imr
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/react-toastify/dist/ReactToastify.css"
import "../node_modules/ol/ol.css"
import "./myStyles/olStyle.css"
import "./myStyles/styles.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.querySelector("#root")
// );
