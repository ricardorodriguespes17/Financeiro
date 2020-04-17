import React, { useState } from "react";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import Header from "../../components/Header";
import Content from "../../components/Content";

import { MdDelete as DeleteIcon } from "react-icons/md";

import formatCurrency from "../../utils/formatCurrency";

export default function Revenues() {
  const [showMenu, setShowMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);

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
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Modal item={itemSelected} show={showModal} setShow={setShowModal} />
      <Header setShowDrawer={setShowMenu}>Entradas</Header>
      <Content>
        {revenues.map((item) => (
          <li key={item.id} className="grid-item">
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <div>
              <text className="title" onClick={() => showRevenue(item)}>
                {item.title}
              </text>
              <text onClick={() => showRevenue(item)}>
                {formatCurrency(item.value)}
              </text>
            </div>
          </li>
        ))}
      </Content>
    </div>
  );
}
