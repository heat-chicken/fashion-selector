const path = require('path');
const express = require('express');
const app = express();
const PORT = 3003;
const cors = require('cors');
app.use(cors());// allow cross origin requests

// testing get request for '/' route
app.get('/', (req, res) => {
  return res.status(200).send('<h1>Hello from Express!</h1>');
});

app.post('/api/genImage', (req, res) => {
  console.log('POST request received at /api/genImage');
  res.json({
    data: [
      {
        url: "https://example.com/fake-image-1024x1024.jpg"
      }
    ]
  });
});

// testing get request for '/api/genImage' route
app.post('/mockDalleImg', (req, res) => {
  console.log('POST request received at /mockDalleImg');
  res.json({
    data: [
      {
        url: "https://example.com/fake-image-1024x1024.jpg"
      }
    ]
  });
});


// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
