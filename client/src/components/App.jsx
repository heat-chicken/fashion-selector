// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Nav from './Nav';
import Home from './Home';
import Search from './Search'; // import Search component
import ShowImages from './ShowImages'; // import ShowImages component
import Login from './Login'; // import Login component
import InputForm from './InputForm';
import SignUp from './SignUp';
import About from './About';

import backgroundImage from '../assets/images/background1.jpg';

const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.5, // Adjust this value to change transparency (0 is fully transparent, 1 is fully opaque)
    zIndex: -1,
  },
}));

const ContentContainer = styled(Box)({
  position: 'relative',
  zIndex: 1,
});
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

console.log('App.jsx is running');

function App() {
  return (
    <div>
      <BackgroundBox>
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
      </BackgroundBox>
    </div>
  );
}

export default App;
