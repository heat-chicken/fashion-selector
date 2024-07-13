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

/////////////////////////////////////////////////////////////
// Sorry Yoshi, I tried not to make a mess 
// testing get request for '/api/genImage' route
app.post('/api/genImage', (req, res) => {
  console.log('POST request received at /api/genImage');
  res.json({
    data: [
      {
        url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
      }
    ]
  });
});

// testing get request for '/api/bing' route
app.post('/api/bing', (req, res) => {
  console.log('POST request received at /api/bing');
  res.json([
    {
      contentUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      hostPageUrl: "https://en.wikipedia.org/wiki/Goblin_shark"
    },
    {
      contentUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      hostPageUrl: "https://en.wikipedia.org/wiki/Goblin_shark"
    },
    {
      contentUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      hostPageUrl: "https://en.wikipedia.org/wiki/Goblin_shark"
    },
    {
      contentUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      hostPageUrl: "https://en.wikipedia.org/wiki/Goblin_shark"
    },
    {
      contentUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      hostPageUrl: "https://en.wikipedia.org/wiki/Goblin_shark"
    }
  ]);
});
//////////////////////////////////////////////////////////////////

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
