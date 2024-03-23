import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { indexToAlphabet } from "./component/Hooks/utility";

export const ThemeContext = createContext("light");
export const DataContext = createContext();
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => {
  const lightTheme = useMemo(() => {
    return {
      palette: {
        background: "#fff",
        color: "#000",
      },
      secondary:{
        background:"#e4e4e4",
        color: "#000",
      }
    };
  }, []);

  const darkTheme = useMemo(() => {
    return {
      palette: {
        background: "#333",
        color: "#fff",
      },
    };
  }, []);
  const [theme, setTheme] = useState("light");
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  useEffect(() => {
    setCurrentTheme(theme === "light" ? lightTheme : darkTheme);
  }, [theme, lightTheme, darkTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      <div style={{ ...currentTheme.palette }}>{children}</div>
    </ThemeContext.Provider>
  );
};
export const  DataProvider=({children})=>{
  const defaultCol=10;
  const defaultRow=50;
  const [wb,setWb]=useState({
    name:"Untitled",
    sheets:[{
      name:"Sheet1",
      rows:Array.from({ length: defaultRow }, (_, index) => ({
        value: index+1,
        height:27
      })),
      columns:Array.from({ length: defaultCol }, (_, index) => ({
        value: indexToAlphabet(index),
        width:170
      })),
      cells:Array(defaultRow)
      .fill(null)
      .map(() =>
        Array(defaultCol).fill({ value: "" })
      ),
    }]
  });
  const [activeSheet,setActiveSheet]=useState(0);
  const [activeRow,setActiveRow]=useState(null);
  const [activeColumn,setActiveColumn]=useState(null);

  const findByName=(list, name)=>{
    return list.some(item => {
      return item.name === name;
    });
  }
  const addSheet=()=>{
    setWb((prev)=>{
      const temp={...prev};
      temp.push(
        {
          name:`Sheet ${temp.length}`,
          rows:[],
          colunmns:[],
          cells:[]
        }
      )
      return temp;
    })
  }
  const deleteSheet=(name)=>{
    const sheetsAfterDelete=wb.sheets.filter((sheet)=>sheet.name!==name);
    setWb((prev)=>{
      const temp={...prev};
      temp.sheets=sheetsAfterDelete;
      return temp;
    })
  }
  const updateStyle=(section,data,index)=>{
    switch (section) {
      case 'row':
        setWb((prev)=>{
          const temp=JSON.parse(JSON.stringify(prev));
          temp.sheets[activeSheet].rows[index||activeRow]={...temp.sheets[activeSheet].rows[index||activeRow],...data};
          return temp;
        })
        break;
      case 'column':
        setWb((prev)=>{
          const temp=JSON.parse(JSON.stringify(prev));
          temp.sheets[activeSheet].columns[index||activeColumn]={...temp.sheets[activeSheet].columns[index||activeColumn],...data};
          return temp;
        })
        break;
      case 'cell':
        setWb((prev)=>{
          const temp=JSON.parse(JSON.stringify(prev));
          temp.sheets[activeSheet].cells[activeRow][activeColumn].border={...temp.sheets[activeSheet].cells[activeRow][activeColumn].border,...data};
          return temp;
        })
        break
      default:
        break;
    }
  }
  const insertRow=(index,position="top")=>{
    setWb((prev)=>{
      const temp=JSON.parse(JSON.stringify(prev));
      temp.sheets[activeSheet].rows.splice(position==='top'?index:index+1, 0, {value:position==='top'?index+1:index+2,height:27});
      temp.sheets[activeSheet].cells.splice(position==='top'?index:index+1,0,[]);
      for (let i = position==='top'?index+1:index+2; i < temp.sheets[activeSheet].rows.length; i++) {
        temp.sheets[activeSheet].rows[i].value = (i + 1);
      }
      for (let i = 0; i < temp.sheets[activeSheet].columns.length; i++) {
        temp.sheets[activeSheet].cells[position==='top'?index:index+1].push({value:''});
      }
      return temp
    })
  }
  const insertColumn=(index,position="left")=>{
    setWb((prev)=>{
      const temp=JSON.parse(JSON.stringify(prev));
      temp.sheets[activeSheet].columns.splice(position==='left'?index:index+1, 0, {value:position==='left'?indexToAlphabet(index):indexToAlphabet(index+1),width:170});
      for (let i = position==='left'?index+1:index+2; i < temp.sheets[activeSheet].columns.length; i++) {
        temp.sheets[activeSheet].columns[i].value = indexToAlphabet(i);
      }
      for (let i = 0; i < temp.sheets[activeSheet].rows.length; i++) {
        temp.sheets[activeSheet].cells[i].splice(position==='left'?index:index+1, 0, {value:""});
      }
      return temp
    })
  }
  const update=(compoent,value)=>{
    switch (compoent) {
      case 'wb':
        setWb((prev)=>{
          const temp=JSON.parse(JSON.stringify(prev));;
          temp.name=value;
          return temp;
        })
        break;
      case 'sheet':
        if(findByName(wb.sheets,value)){
          return {
            code:'FAIL',
            message:`Sheet with name ${value} aleady exists.`
          }
        }else{
          setWb((prev)=>{
            const temp=JSON.parse(JSON.stringify(prev));
            temp.sheets[activeSheet].name=value;
            return temp;
          })
        }
        break;
      case 'cell':
        setWb((prev)=>{
          const temp=JSON.parse(JSON.stringify(prev));
          temp.sheets[activeSheet].cells[activeRow][activeColumn].value=value;
          return temp
         })
        break;
      default:
        break;
    }
  }
  return (
    <DataContext.Provider value={{ wb,activeSheet,insertRow,insertColumn,setActiveSheet,activeRow,setActiveRow,activeColumn, setActiveColumn,addSheet, deleteSheet,update,updateStyle }}>
      {children}
    </DataContext.Provider>
  );
}
