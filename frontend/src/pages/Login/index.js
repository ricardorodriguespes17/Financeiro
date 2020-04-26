import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import allActions from "../../store/actions";

import "./styles.css";

import { useFirebase } from "react-redux-firebase";

export default function Login() {
  const navigation = useHistory();

  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [labelError, setLabelError] = useState("");

  const dispatch = useDispatch();

  function onLogin(event) {
    event.preventDefault();

    const data = { name: "Ricardo Rodrigues", email };

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((doc) => {
        var user = { ...data, id: doc.user.uid };
        dispatch(allActions.user.login(user));
        navigation.push("dashboard");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setLabelError("Email inválido");
            break;
          case "auth/user-not-found":
            setLabelError("Usuário não encontrado");
            break;
          case "auth/wrong-password":
            setLabelError("Senha incorreta");
            break;
          default:
            setLabelError("Erro inesperado!");
        }

        setTimeout(() => setLabelError(""), 2500);
      });
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
          {labelError !== "" ? (
            <label className="label-error">{labelError}</label>
          ) : null}
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
