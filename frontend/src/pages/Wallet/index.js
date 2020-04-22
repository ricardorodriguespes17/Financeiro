import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import MenuAdd from "../../components/MenuAdd";
import Modal from "../../components/Modal";

import { MdDelete as DeleteIcon, MdMenu as MenuIcon } from "react-icons/md";

import formatCurrency from "../../utils/formatCurrency";

import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/actions";
import HeaderContent from "../../components/HeaderContent";

export default function Wallet() {
  const navigation = useHistory();

  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);

  const walletItems = useSelector((state) => state.revenues);
  const dispatch = useDispatch();

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

  function showRevenue(item) {
    setItemSelected(item);
    setShowModal(true);
  }

  function addRevenue(item) {
    dispatch(allActions.revenue.addRevenue(item));
  }

  function deleteRevenue(item) {
    dispatch(allActions.revenue.deleteRevenue(item));
  }

  function setRevenue(item) {
    dispatch(allActions.revenue.setRevenue(item));
  }

  function logout() {
    navigation.push("login");
  }

  return (
    <div className="container">
      <Drawer setShow={setShowDrawer} show={showDrawer} />
      <Modal
        item={itemSelected}
        show={showModal}
        setShow={setShowModal}
        dataType="revenue"
        onSetItem={setRevenue}
      />
      <MenuAdd
        onAdd={addRevenue}
        setShow={setShowMenuAdd}
        show={showMenuAdd}
        dataType="revenue"
      />
      <header>
        <button className="button-icon" onClick={() => setShowDrawer(true)}>
          <MenuIcon size={28} />
        </button>
        {`${monthsString[new Date().getMonth()]} / ${new Date().getFullYear()}`}
        <button className="button-secundary" onClick={logout}>
          Sair
        </button>
      </header>
      {/* Content */}
      <ul className="content">
        <HeaderContent />
        <ul className="grid">
          {walletItems.map((item) => (
            <li key={item.id} className="grid-item">
              <div className="box-button">
                <button
                  className="button-icon"
                  onClick={() => deleteRevenue(item)}
                >
                  <DeleteIcon size={24} color="#00a86b" />
                </button>
              </div>
              <div className="box-text">
                <label className="title" onClick={() => showRevenue(item)}>
                  {item.title}
                </label>
                <label onClick={() => showRevenue(item)}>
                  {formatCurrency(item.value)}
                </label>
              </div>
            </li>
          ))}
        </ul>
        <div className="action">
          <button
            className="button-secundary"
            onClick={() => setShowMenuAdd(true)}
          >
            Adicionar
          </button>
        </div>
      </ul>
    </div>
  );
}
