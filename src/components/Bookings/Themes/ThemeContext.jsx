
import React, { createContext, useState, useEffect, useContext } from 'react';
import { themes } from './themes';

// Create the ThemeContext
export const ThemeContext = createContext();

// Create a custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider component
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

// import React, { createContext, useState, useEffect } from 'react';
// import { themes } from './themes';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(themes.default);

//   // Inject CSS variables into the document
//   useEffect(() => {
//     const root = document.documentElement;
//     root.style.setProperty('--primary', theme.primary);
//     root.style.setProperty('--secondary', theme.secondary);
//     root.style.setProperty('--background', theme.background);
//     root.style.setProperty('--text', theme.text);
//     root.style.setProperty('--card-background', theme.card.background);
//     root.style.setProperty('--card-border', theme.card.border);
//     root.style.setProperty('--card-shadow', theme.card.shadow);
//     root.style.setProperty('--button-text', theme.button.text);
//     root.style.setProperty('--button-hover', theme.button.hover);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };