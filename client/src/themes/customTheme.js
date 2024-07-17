// lightTheme.js

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#F5F5F5',
    },
    background: {
      default: '#111111',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  // Add more customizations here
});

export default customTheme;