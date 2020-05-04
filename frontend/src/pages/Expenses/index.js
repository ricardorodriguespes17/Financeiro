import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import formatCurrency from "../../utils/formatCurrency";

import {
  MdDelete as DeleteIcon,
  MdMenu as MenuIcon,
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import MenuAdd from "../../components/MenuAdd";
import allActions from "../../store/actions";
import HeaderContent from "../../components/HeaderContent";
import ModalDelete from "../../components/ModalDelete";

import {
  useFirestore,
  useFirestoreConnect,
  useFirebase,
} from "react-redux-firebase";

export default function Expenses() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const navigation = useHistory();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.firebase.auth);

  const firebase = useFirebase();

  const firestore = useFirestore();
  useFirestoreConnect(() => [{ collection: "expenses" }]);

  const expenses = useSelector((state) =>
    mapMonthArray(state.firestore.data.expenses)
  );

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

  useEffect(getMouthStoraged);

  function showExpenses(item) {
    setItemSelected(item);
    setShowModal(true);
  }

  function confirmDeleteExpense(item) {
    setItemSelected(item);
    setShowModalDelete(true);
  }

  function getMouthStoraged() {
    var monthStoraged = localStorage.getItem("month");
    var yearStoraged = localStorage.getItem("year");

    if (monthStoraged && yearStoraged) {
      setMonth(monthStoraged);
      setYear(yearStoraged);
    }
  }

  function mapMonthArray(array) {
    if (!array) {
      return;
    }

    var dateSelected = new Date(year, month);

    var newArray = Object.keys(array).map((id) => {
      var item = { ...array[id], id };

      if (item.uid !== user.uid) {
        return null;
      }

      var parcels = item.parcels ? item.parcels - 1 : 0;

      var dateItem = new Date(
        item.date.toDate().getFullYear(),
        item.date.toDate().getMonth() + parcels
      );

      while (parcels >= 0) {
        if (
          (dateItem.getMonth() === dateSelected.getMonth() &&
            dateItem.getFullYear() === dateSelected.getFullYear()) ||
          (item.type === "continuous" && dateItem <= dateSelected)
        )
          return item;

        dateItem = new Date(dateItem - 2592000000);

        parcels--;
      }

      return null;
    });

    //Filter for remove null items
    newArray = newArray.filter((item) => item);

    //Sort array
    newArray = sortArray(newArray);

    return newArray;
  }

  function sortArray(array) {
    array.sort((itemA, itemB) => {
      if (itemA.date > itemB.date) {
        return 1;
      } else {
        return -1;
      }
    });

    return array;
  }

  function addExpense(item) {
    firestore
      .collection("expenses")
      .add({
        ...item,
        uid: user.uid,
      })
      .then((doc) => {
        dispatch(allActions.expense.addExpense(doc));
      })
      .catch((error) => {
        console.log("Error on add expense");
      });
  }

  function deleteExpenseAll(item) {
    firestore.collection("expenses").doc(item.id).delete();
  }

  function deleteExpenseNext(item, id) {
    firestore.collection("expenses").doc(id).update(item);
  }

  function setExpense(item, id) {
    firestore.collection("expenses").doc(id).update(item);
  }

  function changeMonth(change) {
    var newMonth;
    var newYear;

    if (change.split) {
      newMonth = parseInt(change.split("-")[1]);
      newYear = parseInt(change.split("-")[0]);
    } else {
      newMonth = parseInt(month) + change;
      newYear = parseInt(year);
    }

    if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    }

    if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }

    var date = new Date(newYear, newMonth, 1);

    localStorage.setItem("month", date.getMonth());
    localStorage.setItem("year", date.getFullYear());

    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  function itemPaid(paid) {
    var paidMap = paid
      .map((item) => {
        if (
          item.split("-")[1] === String(parseInt(month) + 1) &&
          item.split("-")[0] === String(year)
        ) {
          return item;
        } else {
          return null;
        }
      })
      .filter((item) => item);

    return paidMap.length > 0;
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

  function renderItem(item) {
    return (
      <li key={item.id} className="grid-item">
        <div className="box-button">
          <button
            className="button-icon"
            onClick={() => confirmDeleteExpense(item)}
          >
            <DeleteIcon size={24} color="#00a86b" />
          </button>
        </div>
        <div className="box-text">
          <label
            className={itemPaid(item.paid) ? "title-paid" : "title"}
            onClick={() => showExpenses(item)}
          >
            {item.title}
          </label>
          <label onClick={() => showExpenses(item)}>
            {formatCurrency(item.value)}
          </label>
        </div>
      </li>
    );
  }

  return (
    <div className="container">
      <Drawer setShow={setShowDrawer} show={showDrawer} />
      <Modal
        item={itemSelected}
        show={showModal}
        setShow={setShowModal}
        dataType="expense"
        onSetItem={setExpense}
        month={month}
        year={year}
      />
      <MenuAdd
        onAdd={addExpense}
        setShow={setShowMenuAdd}
        show={showMenuAdd}
        dataType="expense"
      />
      <ModalDelete
        item={itemSelected}
        setShow={setShowModalDelete}
        show={showModalDelete}
        currentMonth={month}
        currentYear={year}
        onDeleteAll={deleteExpenseAll}
        onDeleteNext={deleteExpenseNext}
      />
      {/* Header */}
      <header>
        <button className="button-icon" onClick={() => setShowDrawer(true)}>
          <MenuIcon size={28} />
        </button>
        <button className="button-icon" onClick={() => changeMonth(-1)}>
          <LeftIcon size={36} />
        </button>
        <input
          value={
            month !== "" ? `${monthsString[month]} / ${year}` : "---- / ----"
          }
        />
        <button className="button-icon" onClick={() => changeMonth(1)}>
          <RightIcon size={36} />
        </button>
        <button className="button-secundary" onClick={logout}>
          Sair
        </button>
      </header>
      {/* Content */}
      <ul className="content">
        <HeaderContent month={month} year={year} />
        <ul className="grid">
          {expenses ? expenses.map((item) => renderItem(item)) : null}
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
