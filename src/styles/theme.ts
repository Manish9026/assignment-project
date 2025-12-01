'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#1976d2',
              light: '#42a5f5',
              dark: '#1565c0',
            },
            secondary: {
              main: '#dc004e',
              light: '#e33371',
              dark: '#9a0036',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#212121',
              secondary: '#757575',
            },
          }
        : {
            primary: {
              main: '#90caf9',
              light: '#e3f2fd',
              dark: '#42a5f5',
            },
            secondary: {
              main: '#f48fb1',
              light: '#ffc1e3',
              dark: '#bf5f82',
            },
            background: {
              default: '#0f132aff',
              paper: '#05163bff',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export default getTheme;
