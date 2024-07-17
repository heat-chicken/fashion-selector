// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import Nav from './Nav';
import Home from './Home';
import Search from './Search'; // import Search component
import ShowImages from './ShowImages'; // import ShowImages component
import Login from './Login'; // import Login component
import InputForm from './InputForm';
import SignUp from './SignUp';
import About from './About';
import Background from './Background';

import customTheme from '../themes/customTheme';

const ContentContainer = styled(Box)({
  position: 'relative', // position relative to allow z-index to work
  zIndex: 1, // 1 unit above the default z-index
  minHeight: '100vh', // 100% of the viewport height
});
import { ThemeProvider, createTheme } from "@mui/material/styles";


console.log('App.jsx is running');

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> // CssBaseline component to reset CSS styles

          <Router>
            <ContentContainer>
            <Background />
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/about" element={<About />} />
            </Routes>

            </ContentContainer>
          </Router>


    </ThemeProvider>
  );
}

export default App;
