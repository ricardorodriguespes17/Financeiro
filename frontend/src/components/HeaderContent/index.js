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

export default function HeaderContent() {
  const navigation = useHistory();
  const location = navigation.location.pathname.split("/")[1];

  const [revenue, setRevenue] = useState("300");
  const [receipt, setReceipt] = useState("0");
  const [expense, setExpense] = useState("258");
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
        <text>Início</text>
      </div>
      <div
        className={location === "wallet" ? "selected" : ""}
        onClick={() => navigation.push("wallet")}
      >
        <text>Saldo em contas</text>
        <text className={visible ? "" : "visible-of"}>
          {formatCurrency(revenue)}
        </text>
      </div>
      <div
        className={location === "revenues" ? "selected" : ""}
        onClick={() => navigation.push("revenues")}
      >
        <text>Recebimentos</text>
        <text className={visible ? "" : "visible-of"}>
          {formatCurrency(receipt)}
        </text>
      </div>
      <div
        className={location === "expenses" ? "selected" : ""}
        onClick={() => navigation.push("expenses")}
      >
        <text>Despesas</text>
        <text className={visible ? "" : "visible-of"}>
          {formatCurrency(expense)}
        </text>
      </div>
      <div>
        <text>Lucro</text>
        <text className={visible ? "" : "visible-of"}>
          {formatCurrency(
            parseFloat(revenue) + parseFloat(receipt) - parseFloat(expense)
          )}
        </text>
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
