import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';
import carousel1 from '../Assets/Images/carousel-by-minhphamdesign.jpg';
import carousel2 from '../Assets/Images/carousel-by-karsten116.jpg';
import carousel3 from '../Assets/Images/carousel-by-fluxweed.jpg';
import carousel4 from '../Assets/Images/carousel-by-khaledkagii.jpg';
import carousel5 from '../Assets/Images/carousel-by-apollon.jpg';

const items = [
  {
    photo: carousel1,
    description: 'Photo by minhphamdesign @Unsplash',
    artist: 'https://unsplash.com/@minhphamdesign',
  },
  {
    photo: carousel2,
    description: 'Photo by karsten116 @Unsplash',
    artist: 'https://unsplash.com/@karsten116',
  },
  {
    photo: carousel3,
    description: 'Photo by fluxweed @Unsplash',
    artist: 'https://unsplash.com/@fluxweed',
  },
  {
    photo: carousel4,
    description: 'Photo by khaledkagii @Unsplash',
    artist: 'https://unsplash.com/@khaledkagii',
  },
  {
    photo: carousel5,
    description: 'Photo by apollon @Unsplash',
    artist: 'https://unsplash.com/@apollon',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
  };

  return (
    <div style={{ backgroundColor: 'transparent', margin: '15px' }}>
      <Carousel
        autoPlay={true}
        animation="fade"
        indicators={false}
        navButtonsAlwaysInvisible
        interval={2500}
        className="custom-carousel"
      >
        {items.map((item, index) => (
          <Item key={index} item={item} onClick={handleClick} />
        ))}
      </Carousel>
    </div>
  );
};

const Item = ({ item, onClick }) => {
  const handleImageClick = () => {
    onClick();
  };

  return (
    <div
      className="home pages"
      style={{
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: '1rem 10rem',
      }}
    >
      <Paper
        style={{
          position: 'relative',
          margin: '10px',
          transition: 'opacity 3s ease-in-out',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '1rem 10rem',
        }}
      >
        <img
          src={item.photo}
          style={{
            height: '500px',
            opacity: 1,
            transition: 'opacity 3s ease-in-out',
            cursor: 'pointer',
          }}
          alt="carousel"
          onClick={handleImageClick}
        />
        {/* <Typography variant="h5">{item.photo}</Typography> */}
        <Typography variant="subtitle2">
          <a href={item.artist} target="_blank" rel="noopener noreferrer">
            {item.description}
          </a>
        </Typography>
        <Button className="CheckButton" onClick={handleImageClick}>
          Discover Your Style!
        </Button>
      </Paper>
    </div>
  );
};

export default Home;
