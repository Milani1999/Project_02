import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Cookies from "js-cookie";

const handleBeforeUnload = () => {
  Cookies.remove("userinfo");
};

window.addEventListener("beforeunload", handleBeforeUnload);

ReactDOM.render(<App />, document.getElementById("root"));
