import React, { createContext, useState, useEffect } from 'react';
import { themes } from './themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.default);

  // Inject CSS variables into the document
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--card-background', theme.card.background);
    root.style.setProperty('--card-border', theme.card.border);
    root.style.setProperty('--card-shadow', theme.card.shadow);
    root.style.setProperty('--button-text', theme.button.text);
    root.style.setProperty('--button-hover', theme.button.hover);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};