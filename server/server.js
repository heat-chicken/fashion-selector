const express = require('express');
const path = require('path');
const app = express();
const PORT = 3003;

const bodyParser = require('body-parser');
const fs = require('fs');


const fashionAdvisorController = require('./controllers/fashionAdvisorController');
const SB_func  = require('./controllers/imgSave')

app.use(express.json()); //delete if no need for json

app.post(
  '/api/genImage',

  (req, res) => {
    console.log('serving image generater');
    image_url = 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883'
    return res.status(200).json({image_url});
  }
);

app.post('/api/bing',  (req, res) => {
  console.log('serving match generater');

  const result = [{        contentUrl: 'https://www.oncueapparel.com/cdn/shop/products/Cat_and_Pizza_TS.jpg?v=1573994704',
    hostPageUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    name: 'TEST1'}, {        contentUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    hostPageUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    name: 'TEST2'},{        contentUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    hostPageUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    name: 'TEST3'}]

  return res.status(200).json(result);
});


/* the following two routers are useful when you don't want to make actual API calls but want to test front end
app.post(
  '/api/genImage',

  (req, res) => {
    console.log('serving image generater');
    image_url = 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883'
    return res.status(200).json({image_url});
  }
);

app.post('/api/bing',  (req, res) => {
  console.log('serving match generater');

  const result = [{        contentUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    hostPageUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    name: 'TEST1'}, {        contentUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    hostPageUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    name: 'TEST2'},{        contentUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    hostPageUrl: 'https://www.shelfies.com/cdn/shop/products/ABSTRACT-COLOR-Tee-Front-Mask_1500x.jpg?v=1593644883',
    name: 'TEST3'}]

  return res.status(200).json(result);
});
*/

app.post('/api/save', SB_func.insertItemsToDatabase  , (req, res) => {

    console.log('serving saving images');

    return res.status(200);
})

app.get('/api/getsaveImg', SB_func.getSavedImg  , (req, res) => {

  console.log('serving gettinng saved images');

  return res.status(200);
})


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
