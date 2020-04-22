import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  MdMenu as MenuIcon,
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
} from "react-icons/md";

export default function Header({ setShowDrawer }) {
  const navigation = useHistory();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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

  useEffect(getDateStoraged, []);

  function getDateStoraged() {
    var month = localStorage.getItem("month");
    var year = localStorage.getItem("year");

    if (month && year) {
      setMonth(month);
      setYear(year);
    }
  }

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

    localStorage.setItem("month", date.getMonth());
    localStorage.setItem("year", date.getFullYear());

    setMonth(date.getMonth());
    setYear(date.getFullYear());

    navigation.push(navigation.location.pathname);
  }

  function logout() {
    navigation.push("login");
  }

  return (
    <header>
      <button className="button-icon" onClick={() => setShowDrawer(true)}>
        <MenuIcon size={28} />
      </button>
      <button className="button-icon" onClick={() => changeMonth(-1)}>
        <LeftIcon size={36} />
      </button>
      {month !== "" ? `${monthsString[month]} / ${year}` : "---- / ----"}
      <button className="button-icon" onClick={() => changeMonth(1)}>
        <RightIcon size={36} />
      </button>
      <button className="button-secundary" onClick={logout}>
        Sair
      </button>
    </header>
  );
}
