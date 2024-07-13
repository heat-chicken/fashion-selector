const express = require('express');
const path = require('path');
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
  console.log(req.body);
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



const fashionAdvisorController = require('./controllers/fashionAdvisorController');

app.use(express.json()); //delete if no need for json 


app.post('/api/genImg', fashionAdvisorController.ImgGenService, (req, res) => {
    console.log('serving image generater')

    
    return res.status(200)
})

app.post('/api/match', fashionAdvisorController.matchService, (req, res) => {
    console.log('serving match generater')

 
    return res.status(200)
})

// this should take the user to the first page
app.use('/', (req, res) => {
    console.log('get to the first page ')
    return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
  });
  
/**
 * 404 handler
 */
app.use('*', (req,res) => {
    console.log('error finding url')
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
  
app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });
  
module.exports = app;