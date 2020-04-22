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

export default function Expenses() {
  const navigation = useHistory();

  const [showDrawer, setShowDrawer] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const expenses = useSelector((state) => mapMonthArray(state.expenses));
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
    var monthSelected = month;
    var yearSelected = year;

    monthSelected = parseInt(monthSelected) + 1;
    yearSelected = parseInt(yearSelected);

    var newArray = array.map((item) => {
      var parcels = item.parcels ? item.parcels - 1 : 0;
      var itemMonth = parseInt(item.date.split("-")[1]) + parcels;
      var itemYear = parseInt(item.date.split("-")[0]);

      while (parcels >= 0) {
        if (
          (itemMonth === monthSelected && itemYear === yearSelected) ||
          (item.type === "continuous" &&
            itemMonth <= monthSelected &&
            itemYear <= yearSelected)
        )
          return item;

        itemMonth--;
        parcels--;

        if (itemMonth > 11) {
          itemMonth = 0;
          itemYear++;
        }
      }

      return null;
    });

    newArray = newArray.filter((item) => item);

    return newArray;
  }

  function addExpense(item) {
    dispatch(allActions.expense.addExpense(item));
  }

  function deleteExpenseAll(item) {
    dispatch(allActions.expense.deleteExpenseAll(item));
  }

  function deleteExpenseNext(item) {
    dispatch(allActions.expense.deleteExpenseNext(item));
  }

  function setExpense(item) {
    dispatch(allActions.expense.setExpense(item));
  }

  function changeMonth(change) {
    var newMonth = parseInt(month) + change;
    var newYear = parseInt(year);

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
        dataType="expense"
        onSetItem={setExpense}
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
        {month !== "" ? `${monthsString[month]} / ${year}` : "---- / ----"}
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
          {expenses.map((item) => (
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
                <label className="title" onClick={() => showExpenses(item)}>
                  {item.title}
                </label>
                <label onClick={() => showExpenses(item)}>
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
