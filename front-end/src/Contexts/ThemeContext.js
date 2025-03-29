import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#4a6fa5' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#ff7e5f' : '#f48fb1',
      },
      background: {
        default: mode === 'light' ? '#f8f9fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 20px',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}