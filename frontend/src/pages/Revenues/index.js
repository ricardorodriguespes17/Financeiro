import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import { MdDelete as DeleteIcon, MdMenu as MenuIcon } from "react-icons/md";

import "./styles.css";
import formatCurrency from "../../utils/formatCurrency";

export default function Revenues() {
  const navigation = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [revenue, setRevenue] = useState("300");
  const [receipt, setReceipt] = useState("0");
  const [expense, setExpense] = useState("258");

  const revenues = [
    {
      id: "1",
      title: "Mãe",
      value: "250",
      description: "Para pagar o aluguel",
      date: new Date(2020, 3, 25),
    },
    {
      id: "2",
      title: "Thiago",
      value: "4",
      description: "Para pagar o Spotify",
      date: new Date(2020, 3, 20),
    },
  ];

  function showRevenue(item) {
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
        <text>Entradas</text>
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
          {revenues.map((item) => (
            <li key={item.id}>
              <button className="button-icon">
                <DeleteIcon size={24} color="#00a86b" />
              </button>
              <text onClick={() => showRevenue(item)}>{item.title}</text>
              <text onClick={() => showRevenue(item)}>
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.value)}
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
