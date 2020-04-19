import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Receipts from "./pages/Receipts";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/receipts" component={Receipts} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  );
}
