import React, { useState } from "react";
import Drawer from "../../components/Drawer";
import MenuAdd from "../../components/MenuAdd";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Content from "../../components/Content";

import { MdDelete as DeleteIcon } from "react-icons/md";

import formatCurrency from "../../utils/formatCurrency";

import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/actions";

export default function Wallet() {
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const walletItems = useSelector((state) => state.revenues);
  const dispatch = useDispatch();

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

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Header setShowDrawer={setShowMenu}>Sua carteira</Header>
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
      <Content onClickAdd={() => setShowMenuAdd(true)}>
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
              <div>
                <div
                  className="color-circle"
                  style={{ backgroundColor: item.color }}
                ></div>
                <label className="title" onClick={() => showRevenue(item)}>
                  {item.title}
                </label>
              </div>
              <label onClick={() => showRevenue(item)}>
                {formatCurrency(item.value)}
              </label>
            </div>
          </li>
        ))}
      </Content>
    </div>
  );
}
