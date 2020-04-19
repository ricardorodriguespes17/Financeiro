import React, { useState } from "react";
import Drawer from "../../components/Drawer";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

import {
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
} from "react-icons/md";

import Content from "../../components/Content";
import Header from "../../components/Header";

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
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
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Header setShowDrawer={setShowMenu}>
        <button className="button-icon" onClick={() => changeMonth(-1)}>
          <LeftIcon size={36} />
        </button>
        {`${monthsString[month]} / ${year}`}
        <button className="button-icon" onClick={() => changeMonth(1)}>
          <RightIcon size={36} />
        </button>
      </Header>
      <Content>
        <li className="grid-item">
          <label className="title">Recebimentos de hoje</label>
        </li>

        <li className="grid-item">
          <label className="title">{`Dispesas de hoje - ${formatDate(
            new Date()
          )}`}</label>
          <ul className="list">
            {expensesToday.map((item) => (
              <li>
                <label>{item.title}</label>
                <label>{formatCurrency(item.value)}</label>
              </li>
            ))}
          </ul>
        </li>

        <li className="grid-item">
          <label className="title">Dispesas por categoria</label>
        </li>
      </Content>
    </div>
  );
}
