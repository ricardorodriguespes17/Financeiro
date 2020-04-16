import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Modal from "react-modal";
import { Drawer } from "@material-ui/core";

import {
  MdMenu as MenuIcon,
  MdKeyboardArrowLeft as LeftIcon,
  MdKeyboardArrowRight as RightIcon,
  MdArrowBack as BackIcon,
} from "react-icons/md";

import "./styles.css";
import setTheme from "../../styles/setTheme";

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);

  function renderDrawer() {
    return (
      <Drawer
        anchor="left"
        onClose={() => setShowMenu(false)}
        open={showMenu}
        transitionDuration={500}
      >
        <div className="modal-header">
          <button className="button-icon" onClick={() => setShowMenu(false)}>
            <BackIcon size={36} />
          </button>
          <text>Financeiro</text>
        </div>
        <div className="modal-body">
          <div className="modal-item">
            <text>Sua carteira</text>
          </div>
          <div className="modal-item">
            <text>Entradas</text>
          </div>
          <div className="modal-item">
            <text>Dispesas</text>
          </div>
          <div className="modal-item">
            <text>Configurações</text>
          </div>
          <div className="modal-item-theme">
            <text>Tema:</text>
            <button
              className="circle-theme-green"
              onClick={() => setTheme("green")}
            />
            <button
              className="circle-theme-dark"
              onClick={() => setTheme("dark")}
            />
            <button
              className="circle-theme-light"
              onClick={() => setTheme("light")}
            />
          </div>
        </div>
      </Drawer>
    );
  }

  return (
    <div className="container">
      {renderDrawer()}
      <header>
        <button className="button-icon" onClick={() => setShowMenu(true)}>
          <MenuIcon size={36} />
        </button>
        <div className="container-title">
          <button className="button-icon">
            <LeftIcon size={48} />
          </button>
          Abril
          <button className="button-icon">
            <RightIcon size={48} />
          </button>
        </div>
        <button className="button-secundary">Sair</button>
      </header>
      <div className="body">
        <ul className="dashboard-content">
          <li className="header-content">
            <div>
              <text>Saldo em contas</text>
              <text>R$ 0,00</text>
            </div>
            <div>
              <text>Recebimentos</text>
              <text>R$ 0,00</text>
            </div>
            <div>
              <text>Dispesas</text>
              <text>R$ 0,00</text>
            </div>
            <div>
              <text>Lucro</text>
              <text>R$ 0,00</text>
            </div>
          </li>
          <li className="content-body">
            <text className="title">Hoje - 15/04/2020</text>
            <div>
              <text>Pagar Fulano</text>
              <text>R$ 30,00</text>
            </div>
            <div>
              <text>Pagar Sicrano</text>
              <text>R$ 10,00</text>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
