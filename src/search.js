import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/Search/App";
import "./styles/shared.scss";
import "./styles/search.scss";

ReactDOM.render(<App />, document.getElementById("container"));
