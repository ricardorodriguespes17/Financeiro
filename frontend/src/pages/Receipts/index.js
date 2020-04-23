import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";
import MenuAdd from "../../components/MenuAdd";

import {
  MdDelete as DeleteIcon,
  MdMenu as MenuIcon,
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
} from "react-icons/md";

import formatCurrency from "../../utils/formatCurrency";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/actions";
import HeaderContent from "../../components/HeaderContent";
import ModalDelete from "../../components/ModalDelete";

export default function Receipts() {
  const navigation = useHistory();

  const [showDrawer, setShowDrawer] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const receipts = useSelector((state) => mapMonthArray(state.receipts));
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

  function showReceipt(item) {
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

  function addReceipt(item) {
    dispatch(allActions.receipt.addReceipt(item));
  }

  function deleteReceiptAll(item) {
    dispatch(allActions.receipt.deleteReceiptAll(item));
  }

  function deleteReceiptNext(item) {
    dispatch(allActions.receipt.deleteReceiptNext(item));
  }

  function setReceipt(item) {
    dispatch(allActions.receipt.setReceipt(item));
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

      //Calcular a diferenca entre o mes sendo mostrado e o mes do item
      var diferenceMonth = monthSelected - itemMonth;
      var diferenceYear = yearSelected - itemYear;
      var diference = diferenceMonth + diferenceYear * 12;

      while (parcels >= 0) {
        if (
          (itemMonth === monthSelected && itemYear === yearSelected) ||
          (item.type === "continuous" && diference >= 0)
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

    localStorage.setItem("month", date.getMonth());
    localStorage.setItem("year", date.getFullYear());

    setMonth(date.getMonth());
    setYear(date.getFullYear());

    navigation.push(navigation.location.pathname);
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
    navigation.push("login");
  }

  return (
    <div className="container">
      <Drawer setShow={setShowDrawer} show={showDrawer} />
      <Modal
        item={itemSelected}
        show={showModal}
        setShow={setShowModal}
        dataType="receipt"
        onSetItem={setReceipt}
        month={month}
        year={year}
      />
      <MenuAdd
        onAdd={addReceipt}
        setShow={setShowMenuAdd}
        show={showMenuAdd}
        dataType="receipt"
      />
      <ModalDelete
        item={itemSelected}
        setShow={setShowModalDelete}
        show={showModalDelete}
        currentMonth={month}
        currentYear={year}
        onDeleteAll={deleteReceiptAll}
        onDeleteNext={deleteReceiptNext}
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
          {receipts.map((item) => (
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
                  onClick={() => showReceipt(item)}
                >
                  {item.title}
                </label>
                <label onClick={() => showReceipt(item)}>
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
