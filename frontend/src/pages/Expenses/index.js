import React, { useState } from "react";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import formatCurrency from "../../utils/formatCurrency";

import { MdDelete as DeleteIcon } from "react-icons/md";

import Header from "../../components/Header";
import Content from "../../components/Content";

export default function Expenses() {
  const [showMenu, setShowMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);

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
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Modal item={itemSelected} show={showModal} setShow={setShowModal} />
      <Header setShowDrawer={setShowMenu}>Despesas</Header>
      <Content>
        {expenses.map((item) => (
          <li key={item.id} className="grid-item">
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <div>
              <text className="title" onClick={() => showExpenses(item)}>
                {item.title}
              </text>
              <text onClick={() => showExpenses(item)}>
                {formatCurrency(item.value)}
              </text>
            </div>
          </li>
        ))}
      </Content>
    </div>
  );
}
