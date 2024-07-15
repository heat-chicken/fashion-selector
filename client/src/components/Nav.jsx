import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Nav;
