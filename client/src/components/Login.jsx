// client/src/components/Login.jsx

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from 'react-google-login';
import {useEffect} from 'react';

const google_key = process.env.CLIENT_ID;



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {



  const navigate = useNavigate(); // remember! react hooks are generally called at the top level of our component function, not inside of event handlers. scope is the key to understanding here.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      
    });
    if(data.get('email') === 'yoshi@gmail.com' && data.get('password') === 'cats'){
      console.log('Login successful');
        navigate('/secretCloset');
    }
  };
 
  
  const onSuccess = async (res)=>{
    console.log(res)
    console.log('successfully logged in')

    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
          Authorization: `Bearer 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`
      }
    })
    console.log(response)




    navigate('/SecretCloset');
    //res.redirect('/home')
}

const onFailure = (res)=>{
    console.log('fail', res)
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            < GoogleLogin
            clientId={google_key}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            // cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  
            
    </ThemeProvider>
  );
}


// onSuccess={responseMessage} onError={errorMessage} 
// const Login = () => {
//   return (
//     <div className="pages">
//       <h1>Welcome to Login</h1>
//       <p>Please login to continue.</p>
//       <form>
//         <TextField
//           id="usernmae_text_box"
//           // defaultValue="hi"
//           label="username" 
//           //value={username}
//           // onChange={(e) => setItem(e.target.value)}
//           //error={errors.item}
//           //helperText={errors.item ? 'Item is required' : ''}
//         />
//         <br />
//         <br />
//         <TextField
        
//         id="password_text_box"
//         // defaultValue="hi"
//         label="password" 
//         //value={password}
//         // onChange={(e) => setItem(e.target.value)}
//         //error={errors.item}
//         //helperText={errors.item ? 'Item is required' : ''}
//       />
//         <br />
//         <br />
//         <Button variant="contained" type="submit">Submit</Button>
//       </form>
//     </div>
//   );
// };

// export default Login;
