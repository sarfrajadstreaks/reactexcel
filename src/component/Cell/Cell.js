import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../context";
import {
  correctionPixel,
  drawBox,
  drawLine,
  updateSheetData,
} from "../Hooks/utility";

export function Cell() {
  const {
    wb,
    activeSheet,
    activeRow,
    activeColumn,
    setActiveRow,
    setActiveColumn,
    update,
  } = useContext(DataContext);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rowUnderMouse, setRowUnderMouse] = useState(0);
  const [colUnderMouse, setColUnderMouse] = useState(0);
  const [cells, setCells] = useState([]);
  const [activeCell_x, setActiveCell_x] = useState(0);
  const [activeCell_y, setActiveCell_y] = useState(0);
  const [context, setContext] = useState(null);
  const canvasRef = useRef(null);
  const overlayDiv = useRef(null);
  useEffect(() => {
    setRows(wb.sheets[activeSheet].rows);
    setColumns(wb.sheets[activeSheet].columns);
    setCells(wb.sheets[activeSheet].cells);
  }, [wb]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (window.devicePixelRatio !== 1) {
      let w = 0;
      let h = 0;
      for (let col in columns) {
        w += columns[col].width+correctionPixel;
      }
      for (let row in rows) {
        h += rows[row].height+correctionPixel;
      }
      canvas.setAttribute("width", w * window.devicePixelRatio);
      canvas.setAttribute("height", h * window.devicePixelRatio);
      canvas.setAttribute("style", "width:" + w + "px; height:" + h + "px;");
    }
    setContext(canvas.getContext("2d"));

    if (context) {
      context.scale(2, 2);
      drawRowsGuideLine();
      drawColumnsGuideLine();
      updateSheetData(context, rows, columns, cells);
      highlightActiveCell();
    }
  }, [rows, columns,activeRow,activeColumn]);

  function drawRowsGuideLine() {
    let height = 0;
    const totalWidth = columns.reduce(
      (total, col) => total + col.width + correctionPixel,
      0
    );
    rows.forEach((row, index) => {
      drawLine(context, 0, height, totalWidth, height, { color: "#d8e3f2" });
      height += row.height + correctionPixel;
      if (index === rows.length - 1) {
        drawLine(context, 0, height, totalWidth, height, { color: "#d8e3f2" });
      }
    });
  }

  function drawColumnsGuideLine() {
    let width = 0;
    const totalHight = rows.reduce(
      (total, row) => total + row.height + correctionPixel,
      0
    );
    columns.forEach((col, index) => {
      drawLine(context, width, 0, width, totalHight, { color: "#d8e3f2" });
      width += col.width + correctionPixel;
      if (index === columns.length - 1) {
        drawLine(context, width, 0, width, totalHight, { color: "#d8e3f2" });
      }
    });
  }
  const findColumnUnderMouse = (mouseX) => {
    let cumulativeWidth = 0;
    let startIndex = 0;
    let endIndex = columns.length - 1;
    for (let i = startIndex; i <= endIndex; i++) {
      cumulativeWidth += columns[i].width + correctionPixel;
      if (cumulativeWidth > mouseX) {
        return i;
      }
    }
  };
  const findRowUnderMouse = (mouseY) => {
    let cumulativeHeight = 0;
    let startIndex = 0;
    let endIndex = rows.length - 1;
    for (let i = startIndex; i <= endIndex; i++) {
      cumulativeHeight += rows[i].height + correctionPixel;
      if (cumulativeHeight > mouseY) {
        return i;
      }
    }
  };
  const highlightActiveCell=()=>{
    if(activeRow!==null && activeColumn!==null){
      const xOffset = columns.slice(0, activeColumn).reduce((acc, curr) => acc + curr.width + correctionPixel, 0);
      const yOffset = rows.slice(0, activeRow).reduce((acc, curr) => acc + curr.height + correctionPixel, 0);
      drawBox(context,xOffset,yOffset,xOffset + columns[activeColumn].width + correctionPixel,yOffset + rows[activeRow].height + correctionPixel);
    }
  }
  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const row_Index = findRowUnderMouse(mouseY);
    const col_Index = findColumnUnderMouse(mouseX);
    setRowUnderMouse(row_Index);
    setColUnderMouse(col_Index);
  };
  function onCellSelect() {
    // this clear and re writes in the previous selected cell
    if (activeRow!==null && activeColumn!==null) {
      if (overlayDiv.current.style.display === "block") {
        update("cell", overlayDiv.current.value);
        overlayDiv.current.value = "";
        overlayDiv.current.style.display = "none";
      }
    }
    const xOffset = columns.slice(0, colUnderMouse).reduce((acc, curr) => acc + curr.width + correctionPixel, 0);
    const yOffset = rows.slice(0, rowUnderMouse).reduce((acc, curr) => acc + curr.height + correctionPixel, 0);
    drawBox(context,xOffset,yOffset,xOffset + columns[colUnderMouse].width + correctionPixel,yOffset + rows[rowUnderMouse].height + correctionPixel);
    // const offset=highlightActiveCell(row,col);
    setActiveCell_x(xOffset);
    setActiveCell_y(yOffset);
    setActiveRow(rowUnderMouse);
    setActiveColumn(colUnderMouse);
  }
  function showOverlay() {
    const rect = canvasRef.current.getBoundingClientRect();
    overlayDiv.current.style.left =
      activeCell_x + rect.left + correctionPixel / 2 + "px";
    overlayDiv.current.style.top =
      activeCell_y + rect.top + correctionPixel / 2 + "px";
    overlayDiv.current.style.width =
      columns[activeColumn].width - 2 * correctionPixel + "px";
    overlayDiv.current.style.height =
      rows[activeRow].height - 2 * correctionPixel + "px";
    overlayDiv.current.style.display = "block";
    overlayDiv.current.setAttribute("cell", `${activeRow}-${activeColumn}`);
    overlayDiv.current.focus();
    overlayDiv.current.value =
      wb.sheets[activeSheet].cells[activeRow][activeColumn].value;
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        onDoubleClick={showOverlay}
        onClick={onCellSelect}
        onMouseMove={handleMouseMove}
      ></canvas>
      <textarea ref={overlayDiv} cell="_" id="overlay" className="overlayDiv" />
    </>
  );
}
