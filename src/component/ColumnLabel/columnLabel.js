import { createRef, useContext, useEffect, useState } from "react";
import { DataContext } from "../../context";
import { useDragToResize } from "../Hooks/useDragToResize";
import styled from "styled-components";
import { useContextMenu } from "../Hooks/useContextMenu";
const StyledDiv = styled.div`
  position: absolute;
  width: 2px;
  height: 99%;
  top: 0;
  right: -2px;
  background-color: #c0c0c0;
  cursor: col-resize;
  &:hover {
    background-color: lightblue;
  }
`;
export const ColumnLable = () => {
  const { wb, activeSheet, updateStyle,setActiveColumn,activeColumn,insertColumn } = useContext(DataContext);
  const [colRefs, setColRef] = useState(
    wb.sheets[activeSheet].columns.map(() => createRef())
  );

  let onClickResize = useDragToResize(colRefs, callback,"x-axis");
  const config=[
    {
        label:"Insert Left",
        param:'left',
        action:insertColumn
    },
    {
        label:"Insert Right",
        param:'right',
        action:insertColumn
    },
    ]
  let {toggleContextMenu,currentState,contextUI}=useContextMenu(config);
  function callback(val) {
    updateStyle(
      "column",
      { width: Number(val.current.parentElement.style.width.replace("px","")) },
      val.current.id
    );
  }
  return (
    <div style={{ display: "flex", position: "sticky", top: 0 }}>
      <div style={{ display: "flex", position: "sticky", top: 0 }}>
        <div style={{ borderRight: "1px solid", minWidth: `20px` }}></div>
        {wb.sheets[activeSheet].columns.map((column, index) => {
          return (
            <div
              key={`columnLabel_${index}`}
              style={{
                textAlign: "center",
                borderRight: "1px solid",
                background: index===activeColumn?"#c8e5ff":"antiquewhite",
                minWidth: `${column.width}px`,
                position: "relative",
                cursor:'pointer'
              }}
              id={`col_${index}`}
              onClick={(event)=>setActiveColumn(event.target.id?Number(event.target.id.match(/\d+/)[0]):Number(event.target.parentNode.id.match(/\d+/)[0]))}
              onContextMenu={(e)=>toggleContextMenu(e)}
            >
              <p style={{ padding: 0, margin: 0 }}>{column.value}</p>
              <StyledDiv
                ref={colRefs[index]}
                id={index}
                onMouseDown={() => onClickResize(index,"Column")}
              />
            </div>
          );
        })}
         {currentState && contextUI}
      </div>
    </div>
  );
};
