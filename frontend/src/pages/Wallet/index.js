import React from "react";

import { MdDelete as DeleteIcon } from "react-icons/md";

import "./styles.css";

export default function Wallet() {
  return (
    <div className="container">
      <header>
        <text>Sua carteira</text>
        <button className="button-secundary">Voltar</button>
      </header>
      <div className="body">
        <ul className="wallet">
          <li>
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <text>Dinheiro em especie</text>
            <text>R$ 20,00</text>
          </li>
          <li>
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <text>Conta Nubank</text>
            <text>R$ 100,00</text>
          </li>
          <li>
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <text>Conta Inter</text>
            <text>R$ 0,00</text>
          </li>
          <li>
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <text>Conta Neon</text>
            <text>R$ 100,00</text>
          </li>
          <li>
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <text>Conta Caixa</text>
            <text>R$ 100,00</text>
          </li>
        </ul>
        <div className="actions">
          <button className="button-secundary">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
