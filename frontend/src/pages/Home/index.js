import React from "react";
import Content from "../../components/Content";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function Home() {
  const navigation = useHistory();

  return (
    <div className="container">
      <header>
        <label>Financeiro</label>
        <button
          className="button-secundary"
          onClick={() => navigation.push("login")}
        >
          Fazer Login
        </button>
      </header>
      <Content></Content>
    </div>
  );
}
