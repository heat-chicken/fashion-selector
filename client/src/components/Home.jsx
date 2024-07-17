import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';
import carousel1 from '../Assets/Images/carousel-by-minhphamdesign.jpg';
import carousel2 from '../Assets/Images/carousel-by-karsten116.jpg';
import carousel3 from '../Assets/Images/carousel-by-fluxweed.jpg';
import carousel4 from '../Assets/Images/carousel-by-khaledkagii.jpg';

const items = [
  {
    photo: carousel1,
    description: 'Photo by fluxweed @Unsplash',
  },
  {
    photo: carousel2,
    description: 'Photo by karsten116 @Unsplash',
  },
  {
    photo: carousel3,
    description: 'Photo by minhphamdesign @Unsplash',
  },
  {
    photo: carousel4,
    description: 'Photo by khaledkagii @Unsplash',
  },
];

const Home = () => {
  return (
    <Carousel>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </Carousel>
  );
};

const Item = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
  };

  return (
    <div
      className="home pages"
      style={{
        textAlign: 'center',
        padding: '1rem 10rem',
      }}
    >
      <Paper>
        <img src={item.photo} style={{ height: '500px' }} />
        {/* <Typography variant="h5">{item.photo}</Typography> */}
        <Typography variant="subtitle2">{item.description}</Typography>
        <Button className="CheckButton" onClick={handleClick}>
          <Typography variant="h4">Discover Your Style!</Typography>
        </Button>
      </Paper>
    </div>
  );
};

export default Home;
