import React, { useState } from "react";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Content from "../../components/Content";
import MenuAdd from "../../components/MenuAdd";

import { MdDelete as DeleteIcon } from "react-icons/md";

import formatCurrency from "../../utils/formatCurrency";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/actions";

export default function Receipts() {
  const [showMenu, setShowMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);

  const receipts = useSelector((state) => state.receipts);
  const dispatch = useDispatch();

  function showReceipt(item) {
    setItemSelected(item);
    setShowModal(true);
  }

  function addReceipt(item) {
    dispatch(allActions.receipt.addReceipt(item));
  }

  function deleteReceipt(item) {
    dispatch(allActions.receipt.deleteReceipt(item));
  }

  function setReceipt(item) {
    dispatch(allActions.receipt.setReceipt(item));
  }

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Modal
        item={itemSelected}
        show={showModal}
        setShow={setShowModal}
        dataType="receipt"
        onSetItem={setReceipt}
      />
      <MenuAdd
        onAdd={addReceipt}
        setShow={setShowMenuAdd}
        show={showMenuAdd}
        dataType="receipt"
      />
      <Header setShowDrawer={setShowMenu}>Entradas</Header>
      <Content onClickAdd={() => setShowMenuAdd(true)}>
        {receipts.map((item) => (
          <li key={item.id} className="grid-item">
            <div className="box-button">
              <button
                className="button-icon"
                onClick={() => deleteReceipt(item)}
              >
                <DeleteIcon size={24} color="#00a86b" />
              </button>
            </div>
            <div className="box-text">
              <label className="title" onClick={() => showReceipt(item)}>
                {item.title}
              </label>
              <label onClick={() => showReceipt(item)}>
                {formatCurrency(item.value)}
              </label>
            </div>
          </li>
        ))}
      </Content>
    </div>
  );
}
