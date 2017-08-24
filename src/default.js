import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/Default/App";
import "./styles/shared.scss";
import "./styles/default.scss";

ReactDOM.render(<App />, document.getElementById("container"));
