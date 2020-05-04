import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

import formatCurrency from "../../utils/formatCurrency";

import { MdClose as CloseIcon } from "react-icons/md";

import "./styles.css";

export default function ModalCenter({
  item,
  show,
  setShow,
  month,
  year,
  dataType,
  onSetItem,
}) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("0");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState(false);
  const [arrayPaid, setArrayPaid] = useState([]);
  const [type, setType] = useState("unique");
  const [parcels, setParcels] = useState(0);

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

  useEffect(loadItem, [item]);

  function loadItem() {
    console.log(item);

    setId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setValue(item.value);
    setCategory(item.category ? item.category : "Outros");
    setDate(
      item.date
        ? item.date.toDate().toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setPaid(itemPaid(item.paid));
    setArrayPaid(item.paid);
    setType(item.type);
    setParcels(item.parcels);
  }

  function itemPaid(paid) {
    if (!month || !year || !paid) {
      return false;
    }

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

    var formatedValue = String(value).replace(/,/g, ".");

    if (formatCurrency(formatedValue).includes("NaN")) {
      alert("Erro\nValor inválido, digite novamente");
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
        value: formatedValue,
        category,
        paid: paid
          ? arrayPaid.concat(`${year}-${parseInt(month) + 1}`)
          : arrayPaid.filter(
              (item) => item !== `${year}-${parseInt(month) + 1}`
            ),
        type,
        parcels,
        date: formatedDate,
      };
    } else if (dataType === "receipt") {
      item = {
        title,
        description,
        value: formatedValue,
        paid: paid
          ? arrayPaid.concat(`${year}-${parseInt(month) + 1}`)
          : arrayPaid.filter(
              (item) => item !== `${year}-${parseInt(month) + 1}`
            ),
        type,
        parcels,
        date: formatedDate,
      };
    } else {
      item = {
        title,
        description,
        value: formatedValue,
      };
    }

    onSetItem(item, id);
    setShow(false);
  }

  return (
    <Modal open={show} className="modal" id="modal-edit">
      <div className="body-modal">
        <div className="box-button">
          <button className="button-icon" onClick={() => setShow(false)}>
            <CloseIcon size={24} color="#00A86b" />
          </button>
        </div>
        <div className="box-label">
          <label>Título: </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="box-text-area">
          <label>Descrição: </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="box-label">
          <div className="box-label-value">
            <label>Valor: R$</label>
            <input
              className="value"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          {dataType !== "revenue" ? (
            <div className="box-label-checkbox">
              <label>Pago</label>
              <input
                className="checkbox"
                type="checkbox"
                checked={paid}
                onChange={(event) => setPaid(!paid)}
              />
            </div>
          ) : null}
        </div>
        {dataType === "expense" ? (
          <>
            <div className="box-label">
              <label>Pagamento: </label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="box-label">
              <label>Categoria: </label>
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
          <div className="box-label">
            <label>Pagamento: </label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        ) : null}

        {dataType !== "revenue" ? (
          <div className="box-label">
            <div className="box-parcel">
              <label>Parcelamento: </label>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="unique">Único</option>
                <option value="parceled">Parcelado</option>
                <option value="continuous">Continuo</option>
              </select>
            </div>
            {type === "parceled" ? (
              <div className="box-parcel">
                <label>Parcelas: </label>
                <input
                  type="number"
                  value={parcels}
                  onChange={(event) => setParcels(event.target.value)}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="box-button-add">
          <button className="button-secundary" onClick={add}>
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
}
