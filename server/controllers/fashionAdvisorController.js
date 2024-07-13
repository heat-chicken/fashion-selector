const fashionAdvisorController = {};

// !!!!!!!! put these in .env before commit!!!!!!!!!!!
const subscriptionKey = "2034cc2db0bc4ecab2a094cc5238e1c3";
const endpoint = "https://api.bing.microsoft.com/v7.0/images/visualsearch";

const openai_key = "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";
const endpoint_openai = 'https://api.openai.com/v1/images/generations';
// import api functions
// const generatImg = require('');
// const matchProd = require('');

fashionAdvisorController.ImgGenService = async (req, res, next) => {

  
    console.log('hi');
    const { item, color, style } = req.body;
    console.log(item, color, style);
  
    if (!item || !color || !style) {
      return res.status(400).json({ error: 'Item, color, or style is missing.' });
    }
  
    try {
      // const fetch = (await import('node-fetch')).default;
  
      const prompt = `Generate an ecommerce product shot of item ${item}, in ${color} color, 
        with ${style} style, with a white background. The product should be facing the front. 
        It is a professional product shot. The generated image should be shown 100% inside 
        the image borders. It should look similar to the existing products out in the market.`;
  
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
      console.log(data)
  
      const image_url = data.data[0].url;
      console.log(image_url);
  
      res.json({ image_url });
    } catch (error) {
      console.error('Dall E Image Generator Error: ', error);
      res
        .status(500)
        .json({ error: 'An error occurred on Dall E Image Generator.' });
    }
  }
   
  ;

  fashionAdvisorController.matchService = async (req, res, next) => {
    // {"imageUrl":"https://m.media-amazon.com/images/I/71Vi50Jz6DL._AC_UY1000_.jpg"} to test

    // console.log(req.body)


    try {
      const { imageUrl } = req.body; //Dall-e's image url is in req.body
      if (!imageUrl) {
        return res.status(400).json({ error: "Dall-e Image URL is required" });
      }
  
      const knowledgeRequest = JSON.stringify({
        imageInfo: { url: imageUrl },
      });
  
      const formData = new FormData();
      formData.append("knowledgeRequest", knowledgeRequest);
  
      const params = new URLSearchParams({ mkt: "en-us" });
      
      const response = await fetch(`${endpoint}?${params}`, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
        body: formData,
      });
      console.log(response)
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
        .filter((action) => action.actionType === "VisualSearch")
        .flatMap((action) => action.data.value)
        .map((item) => ({
          contentUrl: item.contentUrl,
          hostPageUrl: item.hostPageUrl,
        }))
        .filter(
          (item) =>
            item.contentUrl.toLowerCase().includes("shop") ||
            item.hostPageUrl.toLowerCase().includes("shop")
        );
  
      res.json(simplifiedData);
      // return next();
    } catch (error) {
      console.error("Visual Search Error:", error);
      res.status(500).json({ error: "An error occurred on Visual Search." });
      
    }
  
  };

  module.exports = fashionAdvisorController;