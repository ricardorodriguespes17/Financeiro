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
      var id = itemSelected.id;
      var item = {
        title: itemSelected.title,
        description: itemSelected.description,
        type: itemSelected.type,
        date: itemSelected.date,
        paid: itemSelected.paid,
        parcels: itemSelected.parcels,
        value: itemSelected.value,
        uid: itemSelected.uid,
      };

      var dateSelected = new Date(currentYear, currentMonth);
      var dateItem = new Date(
        item.date.toDate().getFullYear(),
        item.date.toDate().getMonth()
      );

      var diference = Math.floor((dateSelected - dateItem) / 2592000000) + 1;

      item.parcels -= diference;

      if (item.parcels === 0) {
        onDeleteAll(item);
      } else if (item.parcels === 1) {
        item.type = "unique";
        onDeleteNext(item, id);
      } else {
        onDeleteNext(item, id);
      }
    }

    setShow(false);
  }

  return (
    <Modal open={show} className="modal-delete" id="modal-delete">
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
