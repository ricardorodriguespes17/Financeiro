import React, { useEffect } from "react";
import Routes from "./routes";

import "./styles/global.css";
import setTheme from "./styles/setTheme";

export default function App() {
  useEffect(() => setTheme());

  return <Routes />;
}
