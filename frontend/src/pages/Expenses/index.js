import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import formatCurrency from "../../utils/formatCurrency";

import { MdDelete as DeleteIcon, MdMenu as MenuIcon } from "react-icons/md";

import "./styles.css";

export default function Expenses() {
  const navigation = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [revenue, setRevenue] = useState("300");
  const [receipt, setReceipt] = useState("0");
  const [expense, setExpense] = useState("258");

  const expenses = [
    {
      id: "1",
      title: "Recarga Oi",
      value: "20",
      description: "",
      date: new Date(2020, 3, 1),
    },
    {
      id: "2",
      title: "Aluguel",
      value: "250",
      description: "",
      date: new Date(2020, 3, 31),
    },
    {
      id: "3",
      title: "Spotify",
      value: "8",
      description: "",
      date: new Date(2020, 3, 20),
    },
  ];

  function showExpenses(item) {
    setItemSelected(item);
    setShowModal(true);
  }

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} navigation={navigation} />
      <Modal item={itemSelected} show={showModal} setShow={setShowModal} />
      <header>
        <button className="button-icon" onClick={() => setShowMenu(true)}>
          <MenuIcon size={36} />
        </button>
        <text>Dispesas</text>
        <button
          className="button-secundary"
          onClick={() => navigation.push("login")}
        >
          Sair
        </button>
      </header>
      <div className="body">
        <div className="header-content">
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
                parseFloat(revenue) + parseFloat(receipt) - parseFloat(expense)
              )}
            </text>
          </div>
        </div>
        <ul className="revenues">
          {expenses.map((item) => (
            <li key={item.id}>
              <button className="button-icon">
                <DeleteIcon size={24} color="#00a86b" />
              </button>
              <text onClick={() => showExpenses(item)}>{item.title}</text>
              <text onClick={() => showExpenses(item)}>
                {formatCurrency(item.value)}
              </text>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button className="button-secundary">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
