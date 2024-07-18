// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';

import Nav from './Nav';
import Home from './Home';
import Search from './Search';
import ShowImages from './ShowImages';
import Login from './Login';
import SignUp from './SignUp';
import About from './About';
import Background from './Background';

import customTheme from '../themes/customTheme';
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
    opacity: 0.5,
    zIndex: -1,
  },
}));


const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
  padding: theme.spacing(2), // Add some padding
}));

console.log('App.jsx is running');


function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Background />
        <ContentContainer>
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