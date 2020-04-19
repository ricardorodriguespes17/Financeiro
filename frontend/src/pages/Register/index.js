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
        <label>Financeiro</label>
        <button
          className="button-secondary"
          onClick={() => navigation.push("login")}
        >
          Voltar ao login
        </button>
      </header>
      <Content small>
        <form>
          <label>Nome</label>
          <input type="label" />
          <label>Email</label>
          <input type="email" />
          <label>Senha</label>
          <input type="password" />
          <label>Confirmar senha</label>
          <input type="password" />
          <button type="submit" className="button-primary" onClick={onRegister}>
            Entrar
          </button>
        </form>
      </Content>
    </div>
  );
}
