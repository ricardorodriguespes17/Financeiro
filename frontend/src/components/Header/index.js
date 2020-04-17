import React from "react";
import { useHistory } from "react-router-dom";

import { MdMenu as MenuIcon } from "react-icons/md";

export default function Header({ setShowDrawer, children }) {
  const navigation = useHistory();

  function logout() {
    navigation.push("login");
  }

  return (
    <header>
      <button className="button-icon" onClick={() => setShowDrawer(true)}>
        <MenuIcon size={28} />
      </button>
      {children}
      <button className="button-secundary" onClick={logout}>
        Sair
      </button>
    </header>
  );
}
