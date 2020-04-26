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

import {
  useFirestore,
  useFirestoreConnect,
  useFirebase,
} from "react-redux-firebase";
import ModalDelete from "../../components/ModalDelete";

export default function Wallet() {
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const navigation = useHistory();

  const user = useSelector((state) => state.firebase.auth);

  const firestore = useFirestore();
  const firebase = useFirebase();
  useFirestoreConnect(() => [{ collection: "revenues" }]);

  const walletItems = useSelector((state) =>
    mapArray(state.firestore.data.revenues)
  );
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

  function mapArray(data) {
    if (!data) return [];

    var newData = Object.keys(data).map((id) => {
      var item = { ...data[id], id };

      if (item.uid === user.uid) {
        return item;
      }

      return null;
    });

    return newData.filter((item) => item);
  }

  function addRevenue(item) {
    firestore
      .collection("revenues")
      .add({ ...item, uid: user.uid })
      .then((doc) => {
        dispatch(allActions.revenue.addRevenue({ ...item, uid: user.uid }));
      })
      .catch((error) => {
        console.log("Error on add expense");
      });
  }

  function confirmDeleteRevenue(item) {
    setItemSelected(item);
    setShowModalDelete(true);
  }

  function deleteRevenue(item) {
    // dispatch(allActions.revenue.deleteRevenue(item));
  }

  function setRevenue(item) {
    // dispatch(allActions.revenue.setRevenue(item));
  }

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(allActions.user.logout());
        navigation.push("login");
      })
      .catch((error) => {
        alert("Erro ao encerrar sessão");
      });
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
      <ModalDelete
        item={itemSelected}
        setShow={setShowModalDelete}
        show={showModalDelete}
        onDeleteAll={deleteRevenue}
        onDeleteNext={deleteRevenue}
      />
      <header>
        <button className="button-icon" onClick={() => setShowDrawer(true)}>
          <MenuIcon size={28} />
        </button>
        <input
          value={`${
            monthsString[new Date().getMonth()]
          } / ${new Date().getFullYear()}`}
        />
        <button className="button-secundary" onClick={logout}>
          Sair
        </button>
      </header>
      {/* Content */}
      <ul className="content">
        <HeaderContent />
        <ul className="grid">
          {walletItems
            ? walletItems.map((item) => (
                <li key={item.id} className="grid-item">
                  <div className="box-button">
                    <button
                      className="button-icon"
                      onClick={() => confirmDeleteRevenue(item)}
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
              ))
            : null}
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
