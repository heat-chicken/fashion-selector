// App.jsx
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';
import { gapi } from 'gapi-script';
import Nav from './Nav';
import Home from './Home';
import Search from './Search';
import ShowImages from './ShowImages';
import Login from './Login';
import SignUp from './SignUp';
import About from './About';
import Background from './Background';
import SecretCloset from './SecretCloset';
import MyCloset from './MyCloset'
import Upload from './Upload';

import customTheme from '../themes/customTheme';
import backgroundImage from '../assets/images/background1.jpg';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const google_key = process.env.CLIENT_ID;

const scope = ""; 
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

    <App />


function App() {

  console.log(google_key)
  useEffect(() => {

    function start(){
        gapi.auth2.init({
            client_id: '135318755257-cbm6k01p765cp64udecsj4vt7mghnc7s.apps.googleusercontent.com',
            scope: '/login'
        })

        // gapi.client.init({
        //     client_id: clientID,
        //     scope: scope
        // })
    };

    gapi.load('client:auth2', start)

})
const onSuccess = (res)=>{
  console.log('successfully logged in')
  navigate('/home');
  //res.redirect('/home')
}

const onFailure = (res)=>{
  console.log('fail', res)
}

  return (
  <GoogleOAuthProvider clientId= {google_key} >
   
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
            <Route path="/secretCloset" element={<SecretCloset />} />
            <Route path="/upload" element={<Upload />} />
           
        
          </Routes>
        </ContentContainer>
      </Router>
    </ThemeProvider>

</GoogleOAuthProvider>
  );
}


export default App;

//  <Route path="/myCloset" element={<MyCloset />} />