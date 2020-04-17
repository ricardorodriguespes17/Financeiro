import React, { useState } from "react";
import Header from "../../components/Header";
import Content from "../../components/Content";
import Drawer from "../../components/Drawer";

export default function Setting() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="container">
      <Drawer show={showDrawer} setShow={setShowDrawer} />
      <Header setShowDrawer={setShowDrawer}>Configurações</Header>
      <Content></Content>
    </div>
  );
}
