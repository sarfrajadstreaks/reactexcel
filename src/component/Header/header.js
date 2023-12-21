import { useTheme } from "../../context";

export const Header=()=>{
    const { theme,currentTheme,toggleTheme } = useTheme();
    return(
        <div style={{ background: currentTheme.palette.background, color: currentTheme.palette.color }}>
           <button onClick={toggleTheme}>change theme</button>
      </div>
    );
}