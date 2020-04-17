import React, { useEffect } from "react";
import Routes from "./routes";

import "./styles/global.css";
import setTheme from "./styles/setTheme";

import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  useEffect(() => setTheme());

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
