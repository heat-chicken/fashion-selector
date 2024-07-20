import React, { useState } from 'react';
import ImageFetcher from './ImageFetcher';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import carousel1 from '../Assets/Images/secretCloset/image (1).png';
import carousel2 from '../Assets/Images/secretCloset/Image from iOS (1).jpg';
import carousel3 from '../Assets/Images/secretCloset/IMG_4166.jpg';
import carousel4 from '../Assets/Images/secretCloset/IMG_20240503_114840.jpg';
import carousel5 from '../Assets/Images/secretCloset/image (1).png';

// const imageUrls = [
//   {
//     photo: carousel1,
//     description: 'Photo by minhphamdesign @Unsplash',
//     artist: 'https://unsplash.com/@minhphamdesign',
//   },
//     {
//     photo: carousel2,
//     description: 'Photo by minhphamdesign @Unsplash',
//     artist: 'https://unsplash.com/@minhphamdesign',
//     },
//     {
//     photo: carousel3,
//     description: 'Photo by minhphamdesign @Unsplash',
//     artist: 'https://unsplash.com/@minhphamdesign',
//     },
//     {
//     photo: carousel4,
//     description: 'Photo by minhphamdesign @Unsplash',
//     artist: 'https://unsplash.com/@minhphamdesign',
//     },
//     {
//     photo: carousel5,
//     description: 'Photo by minhphamdesign @Unsplash',
//     artist: 'https://unsplash.com/@minhphamdesign',
//     },

//   // ... other imageUrls
// ];

const SecretCloset = () => {
  const [imageUrls, setImageUrls] = useState([]); // array of image URLs from ImageFetcher component, lifed from ImageFetcher component to SecretCloset component
  const [activeIndex, setActiveIndex] = useState(0); // index of the active image in the carousel
  console.log('imageUrls:', imageUrls);

  const updateImageUrls = (data) => { // function to update the imageUrls state
    setImageUrls(data); // set the imageUrls state to the data passed in
  };
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Grid container spacing={2} style={{ backgroundColor: 'transparent', margin: '15px' }}>
      <Grid item xs={2}>
        <SideImages imageUrls={imageUrls} start={activeIndex - 2} end={activeIndex} />
      </Grid>
      <Grid item xs={8}>
        <Carousel
          index={activeIndex}
          onChange={(index) => setActiveIndex(index)}
          autoPlay={false}
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible
          next={handleNext}
          prev={handlePrev}
          className="custom-carousel"
        >
          {imageUrls.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Carousel>
        <Button onClick={handlePrev} style={{ position: 'absolute', left: '10px', top: '50%' }}>
          <ArrowBackIosIcon />
        </Button>
        <Button onClick={handleNext} style={{ position: 'absolute', right: '10px', top: '50%' }}>
          <ArrowForwardIosIcon />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <SideImages imageUrls={imageUrls} start={activeIndex + 1} end={activeIndex + 3} />
      </Grid>
    </Grid>
  );
};

const SideImages = ({ imageUrls, start, end }) => {
  const getWrappedIndex = (index) => (index + imageUrls.length) % imageUrls.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {[start, start + 1, end].map((index) => (
        <img
          key={index}
          src={imageUrls[getWrappedIndex(index)].photo}
          alt={`Side item ${index}`}
          style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
        />
      ))}
    </div>
  );
};

const Item = ({ item }) => { // item is an object with photo, description, and artist properties 
  return (
    <div className="home pages" style={{ backgroundColor: 'transparent', textAlign: 'center', padding: '1rem' }}>
      <Paper style={{ position: 'relative', margin: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '1rem' }}>
        <img
          src={item.photo}
          style={{ height: '400px', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
          alt={item.description}
        />
        <Typography variant="subtitle2">
          <a href={item.artist} target="_blank" rel="noopener noreferrer">
            {item.description}
          </a>
        </Typography>
      </Paper>
    </div>
  );
};

export default SecretCloset;

// client/src/components/SecretCloset.jsx