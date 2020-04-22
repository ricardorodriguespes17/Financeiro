import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

import "./styles.css";

export default function ModalDelete({
  item,
  currentMonth,
  currentYear,
  show,
  setShow,
  onDeleteAll,
  onDeleteNext,
}) {
  const [itemSelected, setItemSelected] = useState({ title: "" });

  useEffect(loadItem, [item]);

  function loadItem() {
    setItemSelected(item);
  }

  function del(type) {
    if (type === "all") {
      onDeleteAll(itemSelected);
    } else {
      var item = itemSelected;
      var itemMonth = item.date.split("-")[1] - 1;
      var itemYear = item.date.split("-")[0];

      var diferenceMonth = currentMonth - itemMonth;
      var diferenceYear = (currentYear - itemYear) * 12;

      var diference = diferenceMonth + diferenceYear;

      item.parcels = diference;

      if (item.parcels === 0) {
        onDeleteAll(item);
      } else if (item.parcels === 1) {
        item.type = "unique";
        onDeleteNext(item);
      } else {
        onDeleteNext(item);
      }
    }

    setShow(false);
  }

  return (
    <Modal open={show} className="modal-delete">
      <div className="body-modal">
        <div className="box-label">
          <label>Exclusão</label>
        </div>
        <div>
          <label>{`Deseja realmente excluir "${itemSelected.title}"?`}</label>
        </div>
        <div className="box-actions">
          {item.type === "parceled" ? (
            <>
              <button className="button-secundary" onClick={() => del("all")}>
                Sim, excluir todas parcelas
              </button>
              <button className="button-secundary" onClick={() => del("next")}>
                Sim, excluir todos a partir desse mês
              </button>
            </>
          ) : (
            <button className="button-secundary" onClick={() => del("all")}>
              Sim
            </button>
          )}
          <button className="button-secundary" onClick={() => setShow(false)}>
            Não
          </button>
        </div>
      </div>
    </Modal>
  );
}
