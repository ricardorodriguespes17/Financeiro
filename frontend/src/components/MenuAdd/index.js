import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

import { MdClose as CloseIcon } from "react-icons/md";

import "./styles.css";

export default function MenuAdd({ onAdd, setShow, show, dataType }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("Outros");
  const [date, setDate] = useState("");
  const [parcels, setParcels] = useState(0);
  const [type, setType] = useState("unique");

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
      alert("Faltou algo\nVerifique os dados e tente novamente");
      return;
    }

    if (type === "parceled" && parcels < 2) {
      alert(
        "Parcelamento inválido\nNão é possível parcelar nesse valor e tente novamente"
      );
      return;
    }

    var item;

    var dateArray = date.split("-");

    var formatedDate = new Date(
      dateArray[0],
      parseInt(dateArray[1]) - 1,
      dateArray[2]
    );

    if (dataType === "expense") {
      item = {
        title,
        description,
        value,
        category,
        date: formatedDate,
        paid: [],
        type,
        parcels,
      };
    } else if (dataType === "receipt") {
      item = {
        title,
        description,
        value,
        date: formatedDate,
        paid: [],
        type,
        parcels,
      };
    } else {
      item = {
        title,
        description,
        value,
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
    setCategory("Outros");
    setType("unique");
    setParcels(0);
  }

  return (
    <Modal open={show} className="menu" id="modal-add">
      <div className="body-menu">
        <div className="box-button-close">
          <button className="button-icon" onClick={closeMenu}>
            <CloseIcon size={24} color="#00A86b" />
          </button>
        </div>
        <div className="box-inputs-row">
          <div className="box-input">
            <label>Título</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
        </div>

        <div className="box-inputs-row">
          <div className="box-text-area">
            <label>Descrição</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="box-input">
            {dataType !== "revenue" ? (
              <>
                <label>Parcelamento</label>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="unique">Unico</option>
                  <option value="parceled">Parcelado</option>
                  <option value="continuous">Continuo</option>
                </select>
              </>
            ) : null}
            {type === "parceled" ? (
              <>
                <label>Parcelado</label>
                <input
                  type="number"
                  value={parcels}
                  onChange={(event) => setParcels(event.target.value)}
                />
              </>
            ) : null}
          </div>
        </div>

        <div className="box-inputs-row">
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
          ) : null}
        </div>

        <div className="box-button-add">
          <button className="button-secundary" onClick={add}>
            Adicionar
          </button>
        </div>
      </div>
    </Modal>
  );
}
