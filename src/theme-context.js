import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import React, { createContext, useState } from 'react';

// Create the context
export const ThemeContext = createContext();

const THEME_STATE = (mode) => responsiveFontSizes(createTheme({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#FFFFFF" : "#374858",
    },
    secondary: {
      main: mode === "light" ? "#374858" : "#ffffff",
    },
    text: {
      primary: mode === "light" ? "#171311" : "#ffffff",
    },
    background: {
      default: mode === "light" ? "#fafafa" : "#3E4347",
      // paper: mode === "light" ? "#fafafa" : "#3E4347",
    },

    
  } 
}));

/**
 * - Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%) #374858 
    - Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%) 3E4347
    - White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%) #ffffff
    - Dark Gray (Light Mode Input): hsl(0, 0%, 52%) #858585
    - Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%) 171311
    - Very Light Gray (Light Mode Background): hsl(0, 0%, 98%) #fafafa
 */


export const ThemeProviderX = ({ children }) => {
  const [theme, setTheme] = useState(THEME_STATE(localStorage.getItem('mode') || "light"));
  const [mode, setMode] = useState(localStorage.getItem('mode') || "light");
  

  const toggleDarkMode = () => {
    const mode = localStorage.getItem('mode') === "dark" ? "light" : "dark";
    setTheme(THEME_STATE(mode));
    setMode(mode);
    localStorage.setItem("mode", mode)
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
