const fashionAdvisorController = {};
const dotenv = require('dotenv');
const fs = require('fs');
//const FileReader = require('filereader');

dotenv.config();
// console.log(dotenv.config())
// console.log(process)

const endpoint = 'https://api.bing.microsoft.com/v7.0/images/visualsearch';
const endpoint_openai = 'https://api.openai.com/v1/images/generations';
const endpoint_openai_edit = 'https://api.openai.com/v1/images/edits';
// console.log('can you read this',process.env);
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const openai_key = process.env.OPENAI_API_KEY;

// import api functions
// const generatImg = require('');
// const matchProd = require('');

fashionAdvisorController.ImgGenService = async (req, res, next) => {
  // console.log(req.body)

  const { item, color, style, features } = req.body;

  console.log(item, color, style, features);

  if (!item || !color || !style || !features) {
    return res
      .status(400)
      .json({ error: 'Item, color, style or features is missing.' });
  }

  try {
    const prompt = `Create an image of a ${style} ${item} in ${color} , 
    featuring ${features}. The image should have a white background 
    and the item should be facing the front. 
    The item should be 100% within the image border.`;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openai_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
      }),
    };

    console.log('Options: ', options);

    const response = await fetch(endpoint_openai, options);

    const data = await response.json();
    console.log(data);

    const image_url = data.data[0].url;
    console.log(image_url);

    res.json({ image_url });
  } catch (error) {
    console.error('Dall E Image Generator Error: ', error);
    res
      .status(500)
      .json({ error: 'An error occurred on Dall E Image Generator.' });
  }
};

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
fashionAdvisorController.ImgEditService = async (req, res, next) => {
  //console.log('file', req.file);
  //console.log('body', req.body);

  


  // function BlobtoDataURL(arrayBuffer) {
  //   var arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[arr.length - 1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // }

  
  
  
  try {

    const imageFile = dataURLtoFile(req.body.uploadImage, 'image.png');
    const prompt = `${req.body.item}.`
    const form = new FormData();
    form.append('prompt', prompt);
    form.append('image', imageFile);
    form.append('n', 1);
    form.append('size', '512x512');
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openai_key}`,
      },
      body: form,

    };

    console.log('Options: ', options);

    const response = await fetch(endpoint_openai_edit, options);

    const data = await response.json();
    //console.log(data);

    const openai_url = data.data[0].url;
    console.log(openai_url);
    
    //fetches png from openai link and processes until it's a string that can be returned to the client
    const image_data = await fetch(openai_url);
    const image_blob = await image_data.blob();
    const image_array = await image_blob.arrayBuffer();
    const image_buffer = Buffer.from(image_array );
    const image_string = image_buffer.toString('base64')
    res.locals.url = 'data:image/png;base64,'.concat(image_string)

    return next();

  } catch (error) {
    console.error('Dall E Image Generator Error: ', error);
    res
      .status(500)
      .json({ error: 'An error occurred on Dall E Image Generator.' });
  }
};

fashionAdvisorController.matchService = async (req, res, next) => {
  // {"imageUrl":"https://m.media-amazon.com/images/I/71Vi50Jz6DL._AC_UY1000_.jpg"} to test

  // console.log(req.body)

  try {
    const { imageUrl } = req.body; //Dall-e's image url is in req.body
    if (!imageUrl) {
      return res.status(400).json({ error: 'Dall-e Image URL is required' });
    }

    const knowledgeRequest = JSON.stringify({
      imageInfo: { url: imageUrl },
    });

    const formData = new FormData();
    formData.append('knowledgeRequest', knowledgeRequest);

    const params = new URLSearchParams({ mkt: 'en-us' });

    const response = await fetch(`${endpoint}?${params}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
      body: formData,
    });
    console.log(response);
    if (!response.ok) {
      console.error(`Bing API Error: ${response.status}`);
      return res.status(response.status).json({
        error: `Bing API request failed with status ${response.status}`,
      });
    }

    const data = await response.json();

    // Extract only contentUrl and hostPageUrl contains "shop" from the response
    // can be further processed
    // contentUrl: the image to display
    // hostPageUrl: for user to click on
    // console.log(data)
    const simplifiedData = data.tags[0].actions
      .filter((action) => action.actionType === 'VisualSearch')
      .flatMap((action) => action.data.value)
      .map((item) => ({
        contentUrl: item.contentUrl,
        hostPageUrl: item.hostPageUrl,
        name: item.name,
      }))
      .filter(
        (item) =>
          item.contentUrl.toLowerCase().includes('shop') ||
          item.hostPageUrl.toLowerCase().includes('shop')
      );

    res.json(simplifiedData);
    // return next();
  } catch (error) {
    console.error('Visual Search Error:', error);
    res.status(500).json({ error: 'An error occurred on Visual Search.' });
  }
};

fashionAdvisorController.uploadMatch = async (req, res, next) => {
  // {"imageUrl":"https://m.media-amazon.com/images/I/71Vi50Jz6DL._AC_UY1000_.jpg"} to test

  // console.log(req.body)

  try {
    const imageFile = dataURLtoFile(req.body.uploadImage, 'image.png');
    //const { imageUrl } = req.body; //Dall-e's image url is in req.body
    if (!imageFile) {
      return res.status(400).json({ error: 'Image is required' });
    }

 

    const formData = new FormData();
    formData.append('image', imageFile);

    const params = new URLSearchParams({ mkt: 'en-us', name: 'image', filename: 'image.png' });

    const response = await fetch(`${endpoint}?${params}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Disposition': 'form-data'
      },
      body: formData,
    });
    console.log(response);
    if (!response.ok) {
      console.error(`Bing API Error: ${response.status}`);
      return res.status(response.status).json({
        error: `Bing API request failed with status ${response.status}`,
      });
    }

    const data = await response.json();

    // Extract only contentUrl and hostPageUrl contains "shop" from the response
    // can be further processed
    // contentUrl: the image to display
    // hostPageUrl: for user to click on
    // console.log(data)
    const simplifiedData = data.tags[0].actions
      .filter((action) => action.actionType === 'VisualSearch')
      .flatMap((action) => action.data.value)
      .map((item) => ({
        contentUrl: item.contentUrl,
        hostPageUrl: item.hostPageUrl,
        name: item.name,
      }))
      .filter(
        (item) =>
          item.contentUrl.toLowerCase().includes('shop') ||
          item.hostPageUrl.toLowerCase().includes('shop')
      );

    res.json(simplifiedData);
    // return next();
  } catch (error) {
    console.error('Visual Search Error:', error);
    res.status(500).json({ error: 'An error occurred on Visual Search.' });
  }
};


module.exports = fashionAdvisorController;
