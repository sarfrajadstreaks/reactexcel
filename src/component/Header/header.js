import { useEffect } from "react";
import { useTheme } from "../../context";
import { CellStyler } from "../CellStyler/cellStyler";
import { FontStyler } from "../FontStyler/fontStyler";
// import{ TextFill} from '@carbon/icons/es/text--fill/16'

export const Header = ({ activeCell, setActiveCell }) => {
  const { theme, currentTheme, toggleTheme } = useTheme();
  const changeFillColor = () => {
    activeCell && setActiveCell({ ...activeCell, borderTop: 10 });
  };
  useEffect(() => {
    console.log("Header:activeCell:", activeCell);
  }, [activeCell]);
  return (
    <div
      style={{
        background: currentTheme.palette.background,
        color: currentTheme.palette.color,
      }}
    >
      <div>
        <button onClick={toggleTheme}>change theme</button>
      </div>
      <div>
        <div style={{display:"flex", alignItems:"center",gap:"10px"}}>
          <CellStyler />
          <FontStyler />
        </div>
      </div>
    </div>
  );
};
