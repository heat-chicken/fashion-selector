// lightTheme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#111111',
    },
    // other customizations
  },
});

export default darkTheme;