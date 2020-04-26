import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import { Pie } from "react-chartjs-2";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

import {
  MdArrowForward as ArrowRightIcon,
  MdMenu as MenuIcon,
} from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/actions";

import "./styles.css";
import HeaderContent from "../../components/HeaderContent";
import { useFirebase } from "react-redux-firebase";

export default function Dashboard() {
  const navigation = useHistory();

  const firebase = useFirebase();

  const dispatch = useDispatch();

  const [showDrawer, setShowDrawer] = useState(false);

  var expensesByCategory = {
    Outros: { value: 0 },
    Alimentação: { value: 0 },
    Casa: { value: 0 },
    Educação: { value: 0 },
    Lazer: { value: 0 },
    Telefonia: { value: 0 },
    Saúde: { value: 0 },
    Transporte: { value: 0 },
    Vestiário: { value: 0 },
    Viagem: { value: 0 },
  };

  const user = useSelector((state) => state.firebase.auth);

  useSelector((state) =>
    mapMonthArray(state.firestore.data.expenses).map((item) => {
      expensesByCategory[item.category].value += parseInt(item.value);
      return item;
    })
  );

  const expensesToday = useSelector((state) =>
    state.expenses.filter((item) =>
      new Date().toISOString().includes(item.date)
    )
  );

  const receiptToday = useSelector((state) =>
    state.receipts.filter((item) =>
      new Date().toISOString().includes(item.date)
    )
  );

  function mapMonthArray(array) {
    if (!array) {
      return [];
    }

    var monthSelected = new Date().getMonth();
    var yearSelected = new Date().getFullYear();

    monthSelected = parseInt(monthSelected) + 1;
    yearSelected = parseInt(yearSelected);

    var newArray = Object.keys(array).map((id) => {
      var item = { ...array[id], id };

      if (item.uid !== user.uid) {
        return null;
      }

      var parcels = item.parcels ? item.parcels - 1 : 0;
      var itemMonth = parseInt(item.date.split("-")[1]) + parcels;
      var itemYear = parseInt(item.date.split("-")[0]);

      while (parcels >= 0) {
        if (
          (itemMonth === monthSelected && itemYear === yearSelected) ||
          item.type === "continuous"
        )
          return item;

        itemMonth--;
        parcels--;

        if (itemMonth > 11) {
          itemMonth = 0;
          itemYear++;
        }
      }

      return null;
    });

    newArray = newArray.filter((item) => item);

    return newArray;
  }

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(allActions.user.logout());
        navigation.push("login");
      })
      .catch((error) => {
        alert("Erro ao encerrar sessão");
      });
  }

  return (
    <div className="container">
      <Drawer setShow={setShowDrawer} show={showDrawer} />
      <header>
        <button className="button-icon" onClick={() => setShowDrawer(true)}>
          <MenuIcon size={28} />
        </button>
        Painel
        <button className="button-secundary" onClick={logout}>
          Sair
        </button>
      </header>
      {/* Content */}
      <ul className="content">
        <HeaderContent />
        <ul className="grid">
          <li className="grid-item-dashboard">
            <label className="title">Recebimentos de hoje</label>
            <ul className="list">
              {receiptToday.map((item) => (
                <li>
                  <label className="expense-today-title">{item.title}</label>
                  <label className="expense-today-text">
                    {formatCurrency(item.value)}
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="button-outline"
              onClick={() => navigation.push("receipts")}
            >
              <label>Ver todos</label>
              <ArrowRightIcon />
            </button>
          </li>

          <li className="grid-item-dashboard">
            <label className="title">{`Dispesas de hoje - ${formatDate(
              new Date()
            )}`}</label>
            <ul className="list">
              {expensesToday.map((item) => (
                <li>
                  <label className="expense-today-title">{item.title}</label>
                  <label className="expense-today-text">
                    {formatCurrency(item.value)}
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="button-outline"
              onClick={() => navigation.push("expenses")}
            >
              <label>Ver todas</label>
              <ArrowRightIcon />
            </button>
          </li>

          <li className="grid-item-dashboard">
            <label className="title">Dispesas do mês por categoria</label>
            <Pie
              data={{
                labels: Object.keys(expensesByCategory).filter(
                  (item) => expensesByCategory[item].value > 0
                ),
                datasets: [
                  {
                    label: "expenses",
                    data: Object.keys(expensesByCategory)
                      .filter((item) => expensesByCategory[item].value > 0)
                      .map((item) => expensesByCategory[item].value),
                    backgroundColor: [
                      "#98FB98",
                      "#228B22",
                      "#00FF7F",
                      "#7CFC00",
                      "#00FF00",
                      "#228B22",
                      "#9ACD32",
                      "#00FA9A",
                      "#228B22",
                      "#ADFF2F",
                    ],
                  },
                ],
              }}
              width={100}
              height={70}
              options={{
                elements: {
                  arc: {
                    borderColor: "#FFFFFFAA",
                  },
                },
                legend: {
                  align: "start",
                  display: true,
                  labels: {
                    fontSize: 12,
                    boxWidth: 20,
                    usePointStyle: true,
                  },
                },
              }}
            />
          </li>
        </ul>
      </ul>
    </div>
  );
}
