import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Content from "../../components/Content";

export default function Login() {
  const navigation = useHistory();

  function onLogin() {
    navigation.push("dashboard");
  }

  function register() {
    navigation.push("register");
  }

  return (
    <div className="container">
      <header>
        <text>Financeiro</text>
      </header>
      <Content small>
        <form>
          <text>Email</text>
          <input type="email" />
          <text>Senha</text>
          <input type="password" />
          <button type="submit" className="button-primary" onClick={onLogin}>
            Entrar
          </button>
          <button className="button-outline" onClick={register}>
            Cadastrar
          </button>
        </form>
      </Content>
    </div>
  );
}
