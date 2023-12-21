import { CanvasSheet } from "./component/CanvasSheet/canvasSheet";
import { Header } from "./component/Header/header";
import { Workspace } from "./component/Workspace/workspace";
import { useTheme } from "./context";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
  <div style={{width:'100%',height:"100vh"}}>
    <Header/>
      <div style={{width:'100%',height:"95vh",overflow:"auto"}}>
        {/* <Workspace/> */}
        <CanvasSheet />
      </div>
        

        <div>
          footer
        </div>
  </div> 
  );
}

export default App;
