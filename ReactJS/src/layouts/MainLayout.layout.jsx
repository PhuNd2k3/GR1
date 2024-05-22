import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout__main">
      <div className="layout__header">
        <Header />
      </div>
      <div className="layout__body">
        <Outlet />
      </div>
    </div>
  );
}
