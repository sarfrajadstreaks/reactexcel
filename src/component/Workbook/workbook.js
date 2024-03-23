import React, { useContext, useState } from "react";
import { Header } from "../Header/header";
import { DataContext, useTheme } from "../../context";
import { Sheet } from "../Sheet/sheet";
import { ColumnLable } from "../ColumnLabel/columnLabel";
import { RowLabel } from "../RowLabel/rowLabel";
export const Workbook = ({ data }) => {
  const hideAllPopups = () => {
    const popups = document.querySelectorAll('[class*="pop-menu"]');
    console.log("popups",popups)
    popups.forEach(popup => {
      popup.style.display = 'none';
    });
  };
  return (
    <div style={{display: "flex",flexDirection: "column",width: "100%",height: "100vh",}} onClick={hideAllPopups}>
      <div style={{ background: "white",padding:'10px'}}>
        <Header/>
      </div>
      <div style={{overflow: "auto",display: "flex",flexDirection: "column",marginBottom: "22px",zIndex: 98}}>
        <ColumnLable />
        <div style={{ display: "flex" }}>
          <RowLabel />
          <Sheet />
        </div>
      </div>
    </div>
  );
};
