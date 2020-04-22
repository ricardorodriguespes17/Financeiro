import React from "react";
import { useHistory } from "react-router-dom";

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
      <div className="home-body"></div>
    </div>
  );
}
