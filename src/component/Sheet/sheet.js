import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../context";
import EditableElement from "../../EditableElement/EditableElement";
import { Cell } from "../Cell/Cell";
const SheetFooter=styled.div`
    display:flex;
    overflow:auto;
    align-items: center;
    background:#d7d7d7;
    height:20px;
    position:fixed;
    bottom:0;
    width:100%
  `;
export const Sheet = () => {
  const {wb,update,setActiveSheet } = useContext(DataContext);

  useEffect(()=>{
    setActiveSheet(0)
  },[])
  
  return (
   <>
      <Cell/>
      <SheetFooter>
        {
          wb.sheets.map((sheet,index)=>{
            return (<span key={`${sheet.name}`} onClick={()=>setActiveSheet(index)}>
              <EditableElement initial={sheet.name} onChangeFn={update} type='sheet'/>
              <span>{(index==0 || index==wb.sheets.length)?"":"|"}</span>
            </span>)
          })
        }
     
      </SheetFooter>
   </>
  );
};
