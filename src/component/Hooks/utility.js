export const correctionPixel=1;
export function indexToAlphabet(index) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    while (index >= 0) {
      result = alphabet[index % 26] + result;
      index = Math.floor(index / 26) - 1;
    }
  
    return result;
  };
  export   const randomBrightColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
};
  export function drawLine(ctx,x1, y1, x2, y2, lineStyle) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = lineStyle.color;
    ctx.lineWidth = lineStyle.width;
    ctx.stroke();
  };
  export function drawBox(ctx,x1,y1,x2,y2){
    x1=x1+correctionPixel;
    x2=x2-correctionPixel;
    y1=y1+correctionPixel;
    y2=y2-correctionPixel;
    drawLine(ctx,x1,y1,x2,y1,{color:'blue'})
    drawLine(ctx,x2,y1,x2,y2,{color:'blue'})
    drawLine(ctx,x1,y2,x2,y2,{color:'blue'})
    drawLine(ctx,x1,y1,x1,y2,{color:'blue'})
  }
  export const WriteContentInCell=(ctx,x,y,cell)=>{
    ctx.fillText(
        cell.value,
        x,
        y
      );
  }
  export const updateSheetData=(ctx,rows,columns,data)=>{
    let _y=rows[0].height;
    for(let i=0;i<=rows.length-1;i++){
        let _x=0;
        for(let j=0;j<=columns.length-1;j++){
          // drawLine(ctx,_x,_y-rows[0].height,_x,_y,{color:data[i][j].border?.left.color || "#d8e3f2"})//left
          applyCellBorder(ctx,_x,_y,columns[j].width,rows[0].height,data[i][j].border)
          WriteContentInCell(ctx,_x+correctionPixel,_y-rows[0].height/2,{value:data[i][j].value})
          _x+=columns[j].width+correctionPixel;
        }
        _y+=rows[i].height+correctionPixel
    }
  }
  export const applyCellBorder=(ctx,x,y,width,height,border)=>{
    border?.top?.color &&  drawLine(ctx,x,y-height,x+width,y-height,{color:border?.top?.color})//top
    border?.right?.color && drawLine(ctx,x+width,y-height,x+width,y,{color:border?.right?.color})//right
    border?.bottom?.color && drawLine(ctx,x,y,x+width,y,{color:border?.bottom?.color})//bottom
    border?.left?.color && drawLine(ctx,x,y-height,x,y,{color:border?.left?.color})//left
  }