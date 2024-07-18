import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h2" gutterBottom>
            About Fashion Selector
          </Typography>
          <Typography variant="body1" paragraph>
            Fashion Selector is your AI-powered fashion assistant, designed to help you discover and refine your personal style.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to make fashion accessible and enjoyable for everyone. Whether you're looking for outfit inspiration or trying to build a wardrobe that truly reflects your personality, Fashion Selector is here to guide you.
          </Typography>
          <Typography variant="body1">
            Explore, experiment, and express yourself through fashion with us!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;