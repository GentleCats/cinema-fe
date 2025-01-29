import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFD02',
    },
    secondary: {
      main: '#1A1A1A',
    },
    background: {
      default: '#FAFAFA',
      paper: '#282828',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#FFFD02',
    },
    action: {
      disabledBackground: 'rgba(255, 253, 2, 0.3)',
      disabled: 'rgba(255, 253, 2, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FAFAFA',
        },
      },
    },
  },
});

export default darkTheme;
