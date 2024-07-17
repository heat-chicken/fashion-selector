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

// Update this import statement
import backgroundImage from '../assets/images/background1.jpg';

// Create a styled component for the background
const BackgroundBox = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
});

console.log('App.jsx is running');

function App() {
  return (
    <Router>
      {/* <h1>App.jsx is running</h1> */}
      <Nav />
      <Routes>
        <Route path="/" element={<Search />} />
        {/* <Route path="/images" element={<ShowImages />} /> */}
        {/* <Route path="/store" element={<StoreListings />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
