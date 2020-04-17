import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import Publicity from "../../components/Publicity";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

import {
  MdMenu as MenuIcon,
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
} from "react-icons/md";

import "./styles.css";

export default function Dashboard() {
  const navigation = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [revenue, setRevenue] = useState("300");
  const [receipt, setReceipt] = useState("0");
  const [expense, setExpense] = useState("258");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [expensesToday, setExpensesToday] = useState([
    { id: "1 ", title: "Spotify", value: "8" },
    { id: "1 ", title: "Aluguel", value: "250" },
  ]);
  const monthsString = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function changeMonth(change) {
    var newMonth = parseInt(month) + change;
    var newYear = parseInt(year);

    if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    }

    if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }

    var date = new Date(newYear, newMonth, 1);

    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} navigation={navigation} />
      <header>
        <button className="button-icon" onClick={() => setShowMenu(true)}>
          <MenuIcon size={36} />
        </button>
        <div className="container-title">
          <button className="button-icon" onClick={() => changeMonth(-1)}>
            <LeftIcon size={48} />
          </button>
          {`${monthsString[month]} / ${year}`}
          <button className="button-icon" onClick={() => changeMonth(1)}>
            <RightIcon size={48} />
          </button>
        </div>
        <button
          className="button-secundary"
          onClick={() => navigation.push("login")}
        >
          Sair
        </button>
      </header>
      {/* <Publicity /> */}
      <div className="body">
        <ul className="dashboard-content">
          <li className="header-content">
            <div onClick={() => navigation.push("wallet")}>
              <text>Saldo em contas</text>
              <text>{formatCurrency(revenue)}</text>
            </div>
            <div onClick={() => navigation.push("revenues")}>
              <text>Recebimentos</text>
              <text>{formatCurrency(receipt)}</text>
            </div>
            <div onClick={() => navigation.push("expenses")}>
              <text>Dispesas</text>
              <text>{formatCurrency(expense)}</text>
            </div>
            <div>
              <text>Lucro</text>
              <text>
                {formatCurrency(
                  parseFloat(revenue) +
                    parseFloat(receipt) -
                    parseFloat(expense)
                )}
              </text>
            </div>
          </li>
          <li className="content-body">
            <text className="title">{`Hoje - ${formatDate(new Date())}`}</text>
            {expensesToday.map((item) => (
              <div>
                <text>{item.title}</text>
                <text>{formatCurrency(item.value)}</text>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
