import React from "react";
import Modal from "@material-ui/core/Modal";

import formatCurrency from "../../utils/formatCurrency";

import { MdClose as CloseIcon } from "react-icons/md";

export default function ModalCenter({ item, show, setShow }) {
  return (
    <Modal open={show} className="modal">
      <div className="body-modal">
        <div className="box-button">
          <button className="button-icon" onClick={() => setShow(false)}>
            <CloseIcon size={24} color="#00A86b" />
          </button>
        </div>
        <div className="box-text">
          <text>Título: </text>
          <text>{item.title}</text>
        </div>
        <div className="box-text">
          <text>Descrição: </text>
          <text>{item.description}</text>
        </div>
        <div className="box-text">
          <text>Valor: </text>
          <text>{formatCurrency(item.value)}</text>
        </div>
        <div className="box-text">
          <text>Pagamento: </text>
          <text>{Intl.DateTimeFormat("pt-br").format(item.date)}</text>
        </div>
      </div>
    </Modal>
  );
}
