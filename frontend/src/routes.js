import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Receipts from "./pages/Receipts";
import Expenses from "./pages/Expenses";
import { useSelector } from "react-redux";

export default function Routes() {
  const auth = useSelector((state) => state.firebase.auth);

  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (auth.isLoaded) {
      setLoaded(true);
      if (auth.isEmpty) setLogged(false);
      else setLogged(true);
    } else setLoaded(false);
  }, [auth]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login">
          {loaded ? !logged ? <Login /> : <Redirect to="dashboard" /> : null}
        </Route>
        <Route path="/register" component={Register}>
          {loaded ? !logged ? <Register /> : <Redirect to="dashboard" /> : null}
        </Route>
        <Route path="/dashboard">
          {loaded ? logged ? <Dashboard /> : <Redirect to="login" /> : null}
        </Route>
        <Route path="/wallet">
          {loaded ? logged ? <Wallet /> : <Redirect to="login" /> : null}
        </Route>
        <Route path="/receipts">
          {loaded ? logged ? <Receipts /> : <Redirect to="login" /> : null}
        </Route>
        <Route path="/expenses">
          {loaded ? logged ? <Expenses /> : <Redirect to="login" /> : null}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
