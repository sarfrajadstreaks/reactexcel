import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext("light");
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider=({children})=>{
    const lightTheme = useMemo(() => {
        return {
          palette: {
            background: '#fff',
            color: '#000',
          },
        };
      }, []);
    
      const darkTheme = useMemo(() => {
        return {
          palette: {
            background: '#333',
            color: '#fff',
          },
        };
      }, []);
    const [theme,setTheme]=useState('light');
    const [currentTheme, setCurrentTheme] = useState(lightTheme);
    useEffect(() => {
      setCurrentTheme(theme === 'light' ? lightTheme : darkTheme);
    }, [theme,lightTheme,darkTheme]);
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ theme,currentTheme, toggleTheme }}>
        <div style={{ ...currentTheme.palette }}>{children}</div>
      </ThemeContext.Provider>
    );
}