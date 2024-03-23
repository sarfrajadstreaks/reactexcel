import { useContext, useEffect } from "react";
import { DataContext, useTheme } from "../../context";
import { CellStyler } from "../CellStyler/cellStyler";
import { FontStyler } from "../FontStyler/fontStyler";
import EditableElement from "../../EditableElement/EditableElement";

export const Header = () => {
  const {wb,update } = useContext(DataContext);
  const { theme, currentTheme, toggleTheme } = useTheme();
  return (
    <>
      
      <div
        style={{
          background: currentTheme.palette.background,
          color: currentTheme.palette.color,
        }}
      >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <EditableElement onChangeFn={update} initial={wb.name} type='wb'/>
          <button onClick={toggleTheme}>change theme</button>
        </div>
       
        <div>
          <div style={{display:"flex", alignItems:"center",gap:"10px"}}>
            <CellStyler />
            <FontStyler />
          </div>
        </div>
      </div>
    </>
  );
};
