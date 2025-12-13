import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      light: string;
      dark: string;
    };
    accent: {
      success: string;
    };
  }
  interface PaletteOptions {
    neutral: {
      light: string;
      dark: string;
    };
    accent: {
      success: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E7A35',
      light: '#32CE69',
      dark: '#155A28',
    },
    secondary: {
      main: '#32CE69',
    },
    neutral: {
      light: '#F7F8F9',
      dark: '#333333',
    },
    accent: {
      success: '#32CE69',
    },
    background: {
      default: '#F7F8F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "sans-serif"',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1E7A35',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#333333',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#333333',
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
          padding: '8px 20px',
          borderRadius: 8,
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          transition: 'all 200ms ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#F7F8F9',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#32CE69',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#32CE69',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#333333',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: 'none',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: '#F7F8F9',
            color: '#1E7A35',
            '&:hover': {
              backgroundColor: '#F7F8F9',
            },
          },
        },
      },
    },
  },
});

export default theme; 