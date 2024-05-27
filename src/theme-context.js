import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import React, { createContext, useState } from 'react';

// Create the context
export const ThemeContext = createContext();

const THEME_STATE = (mode) => responsiveFontSizes(createTheme({ palette: { mode } }));

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
