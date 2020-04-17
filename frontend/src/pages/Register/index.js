import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Content from "../../components/Content";

export default function Register() {
  const navigation = useHistory();

  function onRegister() {
    navigation.push("login");
  }

  return (
    <div className="container">
      <header>
        <text>Financeiro</text>
        <button
          className="button-secondary"
          onClick={() => navigation.push("login")}
        >
          Voltar ao login
        </button>
      </header>
      <Content small>
        <form>
          <text>Nome</text>
          <input type="text" />
          <text>Email</text>
          <input type="email" />
          <text>Senha</text>
          <input type="password" />
          <text>Confirmar senha</text>
          <input type="password" />
          <button type="submit" className="button-primary" onClick={onRegister}>
            Entrar
          </button>
        </form>
      </Content>
    </div>
  );
}
