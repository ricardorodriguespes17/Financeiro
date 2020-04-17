import React, { useState } from "react";
import Drawer from "../../components/Drawer";

import { MdDelete as DeleteIcon } from "react-icons/md";

import formatCurrency from "../../utils/formatCurrency";
import Content from "../../components/Content";
import Header from "../../components/Header";

export default function Wallet() {
  const [showMenu, setShowMenu] = useState(false);
  const [walletItems, setWalletItems] = useState([
    { id: "1", title: "Dinheiro", value: "15" },
    { id: "1", title: "Conta Nubank", value: "245" },
    { id: "1", title: "Conta Caixa", value: "0" },
    { id: "1", title: "Conta Neon", value: "0" },
  ]);

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Header setShowDrawer={setShowMenu}>Sua carteira</Header>
      <Content>
        {walletItems.map((item) => (
          <li key={item.id} className="grid-item">
            <button className="button-icon">
              <DeleteIcon size={24} color="#00a86b" />
            </button>
            <div>
              <text className="title">{item.title}</text>
              <text>{formatCurrency(item.value)}</text>
            </div>
          </li>
        ))}
      </Content>
    </div>
  );
}
