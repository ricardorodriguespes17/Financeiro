import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

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
      <div className="login-body">
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
      </div>
    </div>
  );
}
