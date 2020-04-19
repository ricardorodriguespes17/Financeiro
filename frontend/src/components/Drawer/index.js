import React from "react";
import { Drawer } from "@material-ui/core";

import { MdArrowBack as BackIcon } from "react-icons/md";

import setTheme from "../../styles/setTheme";
import "./styles.css";

export default function DrawerLeft({ show, setShow }) {
  return (
    <Drawer
      anchor="left"
      onClose={() => setShow(false)}
      open={show}
      transitionDuration={500}
    >
      <div className="drawer-header">
        <button className="button-icon" onClick={() => setShow(false)}>
          <BackIcon size={36} />
        </button>
        <label>Financeiro</label>
      </div>
      <div className="drawer-body">
        <div className="drawer-item-theme">
          <label>Tema:</label>
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
