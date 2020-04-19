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
        <label>Financeiro</label>
      </header>
      <Content small>
        <form>
          <label>Email</label>
          <input type="email" />
          <label>Senha</label>
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
