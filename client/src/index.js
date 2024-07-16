// index.js

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';

const theme = createTheme();

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

 // // index.js

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './components/App.jsx';
// import './style.css';

// const root = createRoot(document.getElementById('root'));
// root.render(<App />);
