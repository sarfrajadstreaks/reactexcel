import { useEffect, useState } from "react";
import { CanvasSheet } from "./component/CanvasSheet/canvasSheet";
import { Header } from "./component/Header/header";
import { Workspace } from "./component/Workspace/workspace";
import { useTheme } from "./context";
import { Workbook } from "./component/Workbook/workbook";
// App->[WorkBook]->Sheets[]->sheet->cells[]
function App() {
  // const { theme, toggleTheme } = useTheme();
  // const [activeCell,setActiveCell]=useState(null)

  return (
    <Workbook data={[{name:"Sheet1"},{name:'sheet2'}]}/>
  );
}

export default App;
