import React from "react";

import "./styles.css";
import HeaderContent from "../HeaderContent";

export default function Content({ children, small }) {
  return (
    <ul className={small ? "content-small" : "content"}>
      <HeaderContent />
      <ul className="grid">{children}</ul>
      <div className="action">
        <button className="button-secundary">Adicionar</button>
      </div>
    </ul>
  );
}
