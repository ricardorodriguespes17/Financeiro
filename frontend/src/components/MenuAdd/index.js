import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

import { MdClose as CloseIcon } from "react-icons/md";

import "./styles.css";

export default function MenuAdd({ onAdd, setShow, show, dataType }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#00A86B");
  const [category, setCategory] = useState("Outros");
  const [date, setDate] = useState("");

  const expenseCategories = [
    "Outros",
    "Alimentação",
    "Casa",
    "Educação",
    "Lazer",
    "Telefonia",
    "Saúde",
    "Transporte",
    "Vestiário",
    "Viagem",
  ];

  function add() {
    if (title === "" || value === "") {
      alert("Faltou algo... verifique os dados e tente novamente");
      return;
    }

    var item;

    if (dataType === "expense") {
      item = {
        title,
        description,
        value,
        category,
        date: date === "" ? new Date() : new Date(date),
      };
    } else if (dataType === "receipt") {
      item = {
        title,
        description,
        value,
        date: date === "" ? new Date() : new Date(date),
      };
    } else {
      item = {
        title,
        description,
        value,
        color,
      };
    }

    onAdd(item);
    clearData();
    setShow(false);
  }

  function closeMenu() {
    clearData();
    setShow(false);
  }

  function clearData() {
    setTitle("");
    setDescription("");
    setValue("");
    setDate("");
    setColor("#00A86B");
    setCategory("Outros");
  }

  return (
    <Modal open={show} className="menu">
      <div className="body-menu">
        <div className="box-button-close">
          <button className="button-icon" onClick={closeMenu}>
            <CloseIcon size={24} color="#00A86b" />
          </button>
        </div>
        <div className="box-input">
          <label>Título</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="box-text-area">
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="box-input">
          <label>Valor</label>
          <input
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        {dataType === "expense" ? (
          <>
            <div className="box-input">
              <label>Data do pagamento</label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="box-input">
              <label>Categoria</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {expenseCategories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </>
        ) : dataType === "receipt" ? (
          <div className="box-input">
            <label>Data do pagamento</label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        ) : (
          <div className="box-color">
            <label>Cor</label>
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
        )}
        <div className="box-button-add">
          <button className="button-secundary" onClick={add}>
            Adicionar
          </button>
        </div>
      </div>
    </Modal>
  );
}
