import { createRef, useContext, useState } from "react";
import { DataContext } from "../../context";
import styled from "styled-components";
import { useDragToResize } from "../Hooks/useDragToResize";
import { useContextMenu } from "../Hooks/useContextMenu";
const StyledDiv = styled.div`
  position: absolute;
  width: 99%;
  height: 2px;
  bottom: 0;
  cursor: col-resize;
  &:hover {
    background-color: lightblue;
  }
`;
export const RowLabel = () => {
  
  const { wb, activeSheet, updateStyle,setActiveRow, activeRow,insertRow } = useContext(DataContext);
  const [rowRefs, setRowRef] = useState(
    wb.sheets[activeSheet].rows.map(() => createRef())
  );
  let onClickResize = useDragToResize(rowRefs, callback, "y-axis");
  const config=[
    {
        label:"Insert Above",
        param:'top',
        action:insertRow
    },
    {
        label:"Insert Below",
        param:'bottom',
        action:insertRow
    },
    ]

  let {toggleContextMenu,currentState,contextUI}=useContextMenu(config);
  function callback(val) {
    updateStyle(
      "row",
      {
        height: Number(
          val.current.parentElement.style.height.replace("px", "")
        ),
      },
      val.current.id
    );
  }
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        left: 0,
        zIndex: 99,
      }}
    >
      {wb.sheets[activeSheet].rows.map((row, index) => (
        <div
          key={`rowLabel_${index}`}
          id={`row_${index}`}
          style={{
            background: index === activeRow ? "#c8e5ff" : "antiquewhite",
            borderBottom: "1px solid #cfc3b1",
            minWidth: "20px",
            minHeight: `${row.height}px`,
            position: "relative",
            cursor:'pointer'
          }}
          onClick={(event)=>setActiveRow(event.target.id?Number(event.target.id.match(/\d+/)[0]):Number(event.target.parentNode.id.match(/\d+/)[0]))}
          onContextMenu={(e)=>toggleContextMenu(e)}
        >
          <p style={{ padding: 0, margin: 0 }}>{row.value}</p>
          <StyledDiv
            ref={rowRefs[index]}
            id={index}
            onMouseDown={() => onClickResize(index, "Row")}
          />
        </div>
      ))}
      {currentState && contextUI}
    </div>
  );
};
