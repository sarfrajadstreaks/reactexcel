import React, { useEffect, useRef, useState } from "react";
function indexToAlphabet(index) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  while (index >= 0) {
    result = alphabet[index % 26] + result;
    index = Math.floor(index / 26) - 1;
  }

  return result;
}
export const CanvasSheet = () => {
  const canvasRef = useRef(null);
  const overlayDiv = useRef(null);
  const [context, setContext] = useState(null);
  const [update, setUpdate] = useState(false);
  const [lastSelectedCell,setLastSelectedCell]=useState(null)
  const [isResizePointer, setResizePointer] = useState(false);
  let rowCount = 25;
  let colCount = 15;
  const offset = { left: 50, top: 30 };
  const cellActionColors={
    unselectedCell:"#b1c7e5",
    selectedCell:"#1b73e8",
    editActiveCell:"#0e3d7b",
  }
  const DefaultCellStyle={
    font:{
      size:14,
      color:"black",
      name:"Arial"
    },
    alligment:{
      horizontal:"center",
      vertical:"middle"
    }
  }
  const resolutionFactor=window.devicePixelRatio;
  const [columns, setColumns] = useState(
    Array.from({ length: colCount }, (_, index) => ({
      value: indexToAlphabet(index),
      width: 150,
    }))
  );
  const [rows, setRows] = useState(
    Array.from({ length: rowCount }, (_, index) => ({
      value: index+1,
      height: 50,
    }))
  );
  const [cells, setCells] = useState(
    Array(rows.length)
      .fill(null)
      .map(() => Array(columns.length).fill({ value: "" }))
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    if (window.devicePixelRatio !== 1) {
      let w = offset.left+5//window.innerWidth
      let h = offset.top+5//window.innerHeight;
      for(let col in columns){
        w+=columns[col].width;
      }
      for(let row in rows){
        h+=rows[row].height;
      }
      // let w = 3000//window.innerWidth
     
      canvas.setAttribute("width", w * window.devicePixelRatio);
      canvas.setAttribute("height", h * window.devicePixelRatio);
      canvas.setAttribute("style", "width:" + w + "px; height:" + h + "px;");
    }
    setContext(canvas.getContext("2d"));
  }, []);
  useEffect(() => {
    if (context) {
      overlayDiv.current.value = "";
      context.imageSmoothingEnabled = false;
      context.fillStyle = "white";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      drawCells(columns, "col", `red`);
      drawCells(rows, "row", `green`);
      drawCells(cells, "cell", "blue");
    }
  }, [context, update]);

  function drawBox(topOffset, leftOffset, width, height, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = "1";
    context.rect(getSizeInPixel(leftOffset), getSizeInPixel(topOffset), getSizeInPixel(width), getSizeInPixel(height));
    context.stroke();
  }
  function writeContent(topOffset, leftOffset,width, height,cellData) {
    let style={
      font:`#size#px #name#`,
      color:"#color#",
      horizontal:"#horizontal#",
      vertical:"#vertical#"
    }
      const tempStyle=cellData.style
      style.font=style.font.replace("#size#",getSizeInPixel(tempStyle?.font?.size? tempStyle.font.size:DefaultCellStyle.font.size));
      style.font=style.font.replace("#name#",tempStyle?.font?.name?tempStyle.font.name:DefaultCellStyle.font.name);
      style.color=style.color.replace("#color#",tempStyle?.font?.color?tempStyle.font.color:DefaultCellStyle.font.color);
      style.horizontal=style.horizontal.replace("#horizontal#",tempStyle?.alligment?.horizontal?tempStyle.alligment.horizontal:DefaultCellStyle.alligment.horizontal);
      style.vertical=style.vertical.replace("#vertical#",tempStyle?.alligment?.vertical?tempStyle.alligment.vertical:DefaultCellStyle.alligment.vertical);

      context.font=style.font;
      context.fillStyle=style.color;
      let textAlign = style.horizontal;
      const textWidth = getSizeInPixel(context.measureText(cellData.value).width);
      let text_x_position=leftOffset;
      
      if (textWidth > width) {
        textAlign = 'left';
      }
      context.textAlign = textAlign;
      if (textAlign === 'left') {
        text_x_position = leftOffset;
      } else if (textAlign === 'center') {
        text_x_position = leftOffset + width / 2;
      } else if (textAlign === 'right') {
        text_x_position = leftOffset + width;
      }

      
      let textBaseline = style.vertical;
      const textHeight = getSizeInPixel(tempStyle?.font?.size?tempStyle.font.size: DefaultCellStyle.font.size);
      if (textHeight > height) {
        textBaseline = 'top';
      }
      
      context.textBaseline = textBaseline;
      let text_y_position=topOffset;
      if (textBaseline === 'top') {
        text_y_position = topOffset;
      } else if (textBaseline === 'middle') {
        text_y_position = (topOffset + height / 2);
      } else if (textBaseline === 'bottom') {
        text_y_position = topOffset + height
      }
      context.fillText(cellData.value,getSizeInPixel(text_x_position),getSizeInPixel(text_y_position));
  }
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const drawCells = (cells, headerType, color) => {
    let topOffset = headerType == "col" ? 0 : offset.top;
    let leftOffset = headerType == "row" ? 0 : offset.left;
    let width = 0;
    let height = 0;
    for (let index = 0; index < cells.length; index++) {
      if (headerType == "row") {
        width = rows[index].width ? rows[index].width : offset.left;
        height = rows[index].height ? rows[index].height : offset.top;
        drawBox(topOffset, leftOffset, width, height, "#828282");
        writeContent(topOffset, leftOffset,width, height,rows[index])
        topOffset += height;
      } else if (headerType == "col") {
        width = columns[index].width ? columns[index].width : offset.left;
        height = columns[index].height ? columns[index].height : offset.top;
        drawBox(topOffset, leftOffset, width, height, "#828282");
        writeContent(topOffset, leftOffset,width, height,columns[index])
        leftOffset += width;
      } else {
        for (let colIndex = 0; colIndex < cells[index].length; colIndex++) {
          width = columns[colIndex].width
            ? columns[colIndex].width
            : offset.left;
          height = rows[index].height ? rows[index].height : offset.top;
          drawBox(topOffset, leftOffset, width, height, cellActionColors.unselectedCell);
          writeContent(topOffset, leftOffset,width, height,cells[index][colIndex])
          leftOffset += width;
        }
        topOffset += height;
        leftOffset = offset.left;
      }
    }
  };
  const getSizeInPixel = (value) => {
    return value * resolutionFactor;
  };
  function locateCell(mouse_x, mouse_y) {
    let width = offset.left;
    let height = offset.top;
    let _foundCol = 0;
    let _foundRow = 0;
    for (let index = 0; index < columns.length; index++) {
      if (width +columns[index].width < mouse_x) {
        width += columns[index].width;
      } else if (mouse_x < offset.left) {
        _foundCol = -1;
        break;
      } else {
        _foundCol = index;
        break;
      }
    }
    for (let index = 0; index < rows.length; index++) {
      if (height + rows[index].height < mouse_y) {
        height += rows[index].height;
      } else if (mouse_y < offset.top) {
        _foundRow = -1;
        break;
      } else {
        _foundRow = index;
        break;
      }
    }
    return { _x: width, _y: height, cell: { col: _foundCol, row: _foundRow } };
  }
  function showOverlay(event) {
    const rect=canvasRef.current.getBoundingClientRect();
    const x = event.clientX- rect.left;
    const y = event.clientY- rect.top;
    const { _x, _y, cell } = locateCell(x, y);
    if (cell.col !== -1 && cell.row !== -1) {
      overlayDiv.current.style.left = _x + "px";
      overlayDiv.current.style.top = (_y + rect.top) + "px";
      overlayDiv.current.style.width = (columns[cell.col].width-2) + "px";
      overlayDiv.current.style.height =(rows[cell.row].height-2) + "px";
      overlayDiv.current.style.display = "block";
      overlayDiv.current.setAttribute("cell", `${cell.row}-${cell.col}`);
      overlayDiv.current.focus();
      overlayDiv.current.value=cells[cell.row][cell.col].value
    }
  }
  function hideOverlay(event) {
    const rect = overlayDiv.current.getBoundingClientRect();
    const overlayLeft = rect.left;
    const overlayRight = rect.right;
    const overlayTop = rect.top;
    const overlayBottom = rect.bottom;
    if (
      (event.clientX < overlayLeft ||
      event.clientX > overlayRight ||
      event.clientY < overlayTop ||
      event.clientY > overlayBottom) && (overlayDiv.current.style.display==="block")
    ) {
      const cell = overlayDiv.current.getAttribute("cell").split("-");
      if (cell.length === 2) {
        setCells((prev) => {
          const newState = prev.map((row) => row.map((cell) => ({ ...cell })));
          newState[cell[0]][cell[1]].value = overlayDiv.current.value;
          return newState;
        });
        setUpdate(!update);
        overlayDiv.current.setAttribute("cell", "");
        overlayDiv.current.style.display = "none";
      }
    }else{
      const CanvasRect=canvasRef.current.getBoundingClientRect();
      const canvas_x = event.clientX- CanvasRect.left;
      const canvas_y = event.clientY- CanvasRect.top;
      const { _x, _y, cell } = locateCell(canvas_x, canvas_y);
      if(cell.col>=0 && cell.row>=0){
        if(lastSelectedCell){
          context.clearRect(getSizeInPixel(lastSelectedCell._x),getSizeInPixel(lastSelectedCell._y), getSizeInPixel(lastSelectedCell.width), getSizeInPixel(lastSelectedCell.height));
          drawBox(lastSelectedCell._y,lastSelectedCell._x,lastSelectedCell.width,lastSelectedCell.height,cellActionColors.unselectedCell)
          writeContent(lastSelectedCell._y,lastSelectedCell._x,lastSelectedCell.width,lastSelectedCell.height,cells[lastSelectedCell.row][lastSelectedCell.col])
        }
        drawBox(_y,_x,columns[cell.col].width,rows[cell.row].height,cellActionColors.selectedCell)
        setLastSelectedCell({
          _y,_x,
          width:columns[cell.col].width,
          height:rows[cell.row].height,
          row:cell.row,
          col:cell.col
        })
  
      }
    }
  }
  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const { _x, _y, cell}=locateCell(mouseX,mouseY)
    const isOverResizableArea = mouseX > 198 && mouseX < 202 && mouseY > 0 && mouseY < 150;
    setResizePointer(isOverResizableArea);
    console.clear();
    console.log('Mouse X:', mouseX);
    console.log('Mouse Y:', mouseY);
  };
  const handleMouseLeave = () => {
    // Reset the cursor style when leaving the canvas
    setResizePointer(false);
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #000000",cursor: isResizePointer ? 'ew-resize' : 'auto' }}
        onDoubleClick={showOverlay}
        onClick={hideOverlay}
        onMouseMove={handleMouseMove}
      ></canvas>
      {/* <div ref={overlayDiv} id="overlay" className="overlayDiv">Overlay</div> */}
      <input ref={overlayDiv} cell="_" id="overlay" className="overlayDiv" />
    </>
  );
};
