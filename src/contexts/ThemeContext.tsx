
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme type
export type Theme = 'light' | 'dark';

// Theme context type
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Force light mode only
  const [theme] = useState<Theme>('light');

  // No-op toggle theme function
  const toggleTheme = () => {
    // Light mode only - do nothing
  };

  const setThemeFunc = () => {
    // Light mode only - do nothing
  };

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeFunc, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
