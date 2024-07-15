// Login.jsx

import React, { useState } from 'react';

const Login = () => {
  return (
    <div className="pages">
      <h1>Welcome to Login</h1>
      <p>Please login to continue.</p>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
