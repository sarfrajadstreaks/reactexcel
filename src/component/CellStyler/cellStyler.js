import {
  TextFill,
  BorderFull,
  BorderTop,
  BorderRight,
  BorderBottom,
  BorderLeft,
  BorderNone,
} from "@carbon/icons-react";
import { useContext, useState } from "react";
import { DataContext } from "../../context";
import { ChromePicker } from "react-color";
export const CellStyler = () => {
  const { wb, updateStyle,activeColumn } = useContext(DataContext);
  const [borderType, setBorderType] = useState("solid");
  const [color, setColor] = useState({
    hsl: {
      h: 0,
      s: 0,
      l: 0,
      a: 1,
    },
    hex: "#000000",
    rgb: {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
    hsv: {
      h: 0,
      s: 0,
      v: 0,
      a: 1,
    },
    oldHue: 0,
    source: "hsv",
  });
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const setBorderStyle=(side,color,type)=>{
    const temp={}
    if(side=="all"){
        const val={
            style: type || 'thin' ,
            color: color.hex,
        }
        temp['top']=val;
        temp['right']=val;
        temp['bottom']=val;
        temp['left']=val;
    }else if(side=="none"){
        //
    }
    else{
        temp[side]={
            style: type || 'thin' ,
            color: color.hex,
        }
    }
    
    updateStyle("cell", temp)
  }
  return (
    <>
      {toggleColorPicker && (
        <div style={{ position: "absolute", top: 10, zIndex: 9999 }} className=".pop-menu-color_picker">
          <ChromePicker color={color} onChange={(color) => setColor(color)} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          border: "1px solid #d8e3f2",
          gap: "5px",
          padding: "5px",
        }}
      >
        <TextFill className="cellDecorationIcons" />
        <BorderLeft
          className="cellDecorationIcons"
          onClick={() =>setBorderStyle('left',color)}
        />
        <BorderRight
          className="cellDecorationIcons"
          onClick={() =>setBorderStyle('right',color)}
        />
        <BorderTop
          className="cellDecorationIcons"
          onClick={() =>setBorderStyle('top',color)}
        />
        <BorderBottom
          className="cellDecorationIcons"
          onClick={() =>setBorderStyle('bottom',color)}
        />
        <BorderNone className="cellDecorationIcons" />
        <BorderFull
          className="cellDecorationIcons"
          onClick={() =>
            updateStyle("cell", {
              left: {
                style: "thin",
                color: color.hex,
              },
              right: {
                style: "thin",
                color: color.hex,
              },
              top: {
                style: "thin",
                color: color.hex,
              },
              bottom: {
                style: "thin", // 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
                color: color.hex, // HTML style hex value
              },
            })
          }
        />

        <div
          className="cellDecorationIcons"
          onClick={() => setToggleColorPicker(!toggleColorPicker)}
        >
          <div
            style={{ width: "24px", height: "24px", background: color.hex }}
          ></div>
        </div>
      </div>
    </>
  );
};
