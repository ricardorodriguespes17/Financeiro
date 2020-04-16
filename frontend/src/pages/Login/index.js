import React from "react";

import "./styles.css";

export default function Login() {
  return (
    <div className="container">
      <header>
        <text>Financeiro</text>
      </header>
      <div className="body-small">
        <form>
          <text>Email</text>
          <input type="email" />
          <text>Senha</text>
          <input type="password" />
          <button type="submit" className="button-primary">
            Entrar
          </button>
          <button className="button-outline">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
