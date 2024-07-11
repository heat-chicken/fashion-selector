const path = require('path');
const express = require('express');
const app = express();
const PORT = 3003;

// testing get request for '/' route
app.get('/', (req, res) => {
  return res.status(200).send('<h1>Hello from Express!</h1>');
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
