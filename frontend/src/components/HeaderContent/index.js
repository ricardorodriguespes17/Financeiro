import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import formatCurrency from "../../utils/formatCurrency";

import {
  MdVisibility as VisibleIcon,
  MdVisibilityOff as InvisibleIcon,
} from "react-icons/md";

import {
  AiFillHome as HomeIcon,
  AiOutlineHome as HomeOutineIcon,
} from "react-icons/ai";

import "./styles.css";

import { useSelector } from "react-redux";

export default function HeaderContent({ month, year }) {
  const navigation = useHistory();
  const location = navigation.location.pathname.split("/")[1];

  const revenuesTotal = useSelector((state) =>
    state.revenues.length > 0 ? mapMonthValues(state.revenues) : 0
  );
  const receiptsTotal = useSelector((state) =>
    state.receipts.length > 0 ? mapMonthValues(state.receipts) : 0
  );
  const expensesTotal = useSelector((state) =>
    state.expenses.length > 0 ? mapMonthValues(state.expenses) : 0
  );
  const profitValue =
    parseFloat(revenuesTotal) +
    parseFloat(receiptsTotal) -
    parseFloat(expensesTotal);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    getVisibility();
  }, []);

  async function getVisibility() {
    var data = await localStorage.getItem("visibility");

    if (data) {
      data = JSON.parse(data);
      setVisible(data);
    }
  }

  function setVisibility() {
    var visibility = !visible;

    setVisible(visibility);
    localStorage.setItem("visibility", visibility);
  }

  function mapMonthValues(array) {
    var monthSelected = month ? month : new Date().getMonth();
    var yearSelected = year ? year : new Date().getFullYear();

    monthSelected = parseInt(monthSelected) + 1;
    yearSelected = parseInt(yearSelected);

    var newArray = array.map((item) => {
      var parcels = item.parcels ? item.parcels - 1 : 0;

      var itemMonth;
      var itemYear;

      if (item.date) {
        itemMonth = parseInt(item.date.split("-")[1]) + parcels;
        itemYear = parseInt(item.date.split("-")[0]);
      } else {
        itemMonth = new Date().getMonth() + 1;
        itemYear = new Date().getFullYear();
      }

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

    newArray = newArray.filter((item) => item).map((item) => item.value);

    if (newArray.length === 0) {
      return 0;
    }

    newArray = newArray.reduce(
      (total, numero) => parseFloat(total) + parseFloat(numero)
    );

    return newArray;
  }

  return (
    <li className="header-content">
      <div
        className={location === "dashboard" ? "selected" : ""}
        onClick={() => navigation.push("dashboard")}
      >
        {location === "dashboard" ? (
          <HomeIcon size={32} color="#00A86B" />
        ) : (
          <HomeOutineIcon size={32} color="#00A86B" />
        )}
        <label>Início</label>
      </div>
      <div
        className={location === "wallet" ? "selected" : ""}
        onClick={() => navigation.push("wallet")}
      >
        <label>Saldo em contas</label>
        <label className={visible ? "" : "visible-of"}>
          {formatCurrency(revenuesTotal)}
        </label>
      </div>
      <div
        className={location === "receipts" ? "selected" : ""}
        onClick={() => navigation.push("receipts")}
      >
        <label>Recebimentos</label>
        <label className={visible ? "" : "visible-of"}>
          {formatCurrency(receiptsTotal)}
        </label>
      </div>
      <div
        className={location === "expenses" ? "selected" : ""}
        onClick={() => navigation.push("expenses")}
      >
        <label>Despesas</label>
        <label className={visible ? "" : "visible-of"}>
          {formatCurrency(expensesTotal)}
        </label>
      </div>
      <div
        className={
          profitValue < 0 && visible
            ? "profit-box-negative"
            : "profit-box-positive"
        }
      >
        <label>Lucro</label>
        <label className={visible ? "" : "visible-of"}>
          {formatCurrency(profitValue)}
        </label>
      </div>
      <button className="button-icon" onClick={setVisibility}>
        {visible ? (
          <VisibleIcon size={28} color="#00A86b" />
        ) : (
          <InvisibleIcon size={28} color="#00A86b" />
        )}
      </button>
    </li>
  );
}
