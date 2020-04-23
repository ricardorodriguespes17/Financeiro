import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function Register() {
  const navigation = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onRegister(event) {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    navigation.push("login");
  }

  return (
    <div className="container">
      <header>
        <label>Financeiro</label>
        <button
          className="button-secundary"
          onClick={() => navigation.push("login")}
        >
          Voltar ao login
        </button>
      </header>
      <div className="register-body">
        <form>
          <label>Nome</label>
          <input
            type="label"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>Confirmar senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button type="submit" className="button-primary" onClick={onRegister}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
