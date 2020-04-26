import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import { useFirebase, useFirestore } from "react-redux-firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useHistory();

  const firebase = useFirebase();
  const firestore = useFirestore();

  function onRegister(event) {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    firebase
      .createUser({
        email,
        password,
      })
      .then((doc) => {
        console.log(doc);

        firestore
          .collection("users")
          .add({ ...user, id: doc.user.uid })
          .then(() => {
            navigation.push("login");
          })
          .catch((error) => {
            console.log("erro ao cadastrar usuario");
          });
      })
      .catch((error) => {
        console.log("erro ao criar usuario:" + error);
      });

    console.log(user);
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
