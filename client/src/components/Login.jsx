// Login.jsx

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
  return (
    <div className="pages">
      <h1>Welcome to Login</h1>
      <p>Please login to continue.</p>
      <form>
        <TextField
          id="usernmae_text_box"
          // defaultValue="hi"
          label="username" 
          //value={username}
          // onChange={(e) => setItem(e.target.value)}
          //error={errors.item}
          //helperText={errors.item ? 'Item is required' : ''}
        />
        <br />
        <br />
        <TextField
        
        id="password_text_box"
        // defaultValue="hi"
        label="password" 
        //value={password}
        // onChange={(e) => setItem(e.target.value)}
        //error={errors.item}
        //helperText={errors.item ? 'Item is required' : ''}
      />
        <br />
        <br />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
