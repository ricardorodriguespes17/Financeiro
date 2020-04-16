import React from "react";

import "./styles.css";

export default function Register() {
  return (
    <div className="container">
      <header>
        <text>Financeiro</text>
        <button className="button-secondary">Voltar ao login</button>
      </header>
      <div className="body-small">
        <form>
          <text>Nome</text>
          <input type="text" />
          <text>Email</text>
          <input type="email" />
          <text>Senha</text>
          <input type="password" />
          <text>Confirmar senha</text>
          <input type="password" />
          <button type="submit" className="button-primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
