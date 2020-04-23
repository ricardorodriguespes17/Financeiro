import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import allActions from "../../store/actions";

import "./styles.css";

export default function Login() {
  const navigation = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function onLogin(event) {
    event.preventDefault();

    const data = { name: "Ricardo Rodrigues", email };

    dispatch(allActions.user.login(data));

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
