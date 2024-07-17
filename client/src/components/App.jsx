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
  position: 'relative',
  zIndex: 1,
});
import { ThemeProvider, createTheme } from "@mui/material/styles";


console.log('App.jsx is running');

function App() {
  return (
    <div>

        <ContentContainer>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </ContentContainer>

    </div>
  );
}

export default App;
