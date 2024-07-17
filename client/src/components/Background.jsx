// client/src/components/Background.jsx

import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/images/background1.jpg';

const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
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
  },
}));

const Background = () => {
  return <BackgroundBox />;
};

export default Background;