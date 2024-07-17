const express = require('express');
const path = require('path');
const app = express();
const PORT = 3003;

const fashionAdvisorController = require('./controllers/fashionAdvisorController');

app.use(express.json()); //delete if no need for json

app.post(
  '/api/genImage',
  fashionAdvisorController.ImgGenService,
  (req, res) => {
    console.log('serving image generater');

    return res.status(200);
  }
);

app.post('/api/refineGenImage', (req, res) => {
  console.log('refining generated image');
  return res.status(200);
});

app.post('/api/bing', fashionAdvisorController.matchService, (req, res) => {
  console.log('serving match generater');

  return res.status(200);
});

// this should take the user to the first page
app.get('/search', (req, res) => {
  console.log('get to the search page ');
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  console.log('error finding url');
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  console.log('hit global error');

  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
