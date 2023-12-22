import { useEffect, useState } from "react";
import { CanvasSheet } from "./component/CanvasSheet/canvasSheet";
import { Header } from "./component/Header/header";
import { Workspace } from "./component/Workspace/workspace";
import { useTheme } from "./context";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeCell,setActiveCell]=useState(null)
  useEffect(()=>{
    console.log("App:activeCell:",activeCell)
  },[activeCell])
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Header activeCell={activeCell} setActiveCell={setActiveCell}/>
      <div
        style={{
          width: "100%",
          height: "95vh",
          overflow: "auto",
          padding: "10px",
        }}
      >
        <CanvasSheet activeCell={activeCell} setActiveCell={setActiveCell}/>
      </div>

      <div>footer</div>
    </div>
  );
}

export default App;
