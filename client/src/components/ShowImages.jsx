import React, { useState } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';

import Button from '@mui/material/Button';


function ShowImages({ bingData }) {
  // validImages is an array and each ele is obj associate with every imgs plus new key isValid
  // originally set every pictures state as true 
  const [validImages, setValidImages] = useState(bingData.map(image => ({ ...image, isValid: true, btnLabel: 'SAVE' })));
  
  // in case of broken img url
  const handleImageError = (index) => {
    // change isValied prop to false if the item index matches input index
    setValidImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, isValid: false } : image
      )
    );
  };
  
  const save = async (index, image) =>{

        setValidImages((prevImages) =>
    prevImages.map((image, i) =>
      i === index ? { ...image, btnLabel: 'SAVED!'} : image

    )
  );

    // const itemsToInsert = simplifiedData.map(item => ({ url: item.contentUrl }));    
    const itemsToInsert = [{url: image.contentUrl }]
    //await insertItemsToDatabase(itemsToInsert);

    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemsToInsert),
    });
    

    



  }


  return (
    <div>
      <h2>Search Results</h2>
      <div
        className="bingImagesDisplay"
        style={{
          width: '950px',
          height: '660px',
          overflowY: 'auto',
        }}
      >
        <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} gap={3}>
          {validImages.map((image, index) => (
            // render only if isValid is true
            image.isValid && (
              <ImageListItem
                key={image.contentUrl}
                sx={{ width: 300, height: 150 }}
              >
                <a
                  href={image.hostPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    srcSet={`${image.contentUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${image.contentUrl}?w=248&fit=crop&auto=format`}
                    alt={image.name}
                    loading="lazy"
                    // this gets triggered when the pic url is not working 
                    onError={() => handleImageError(index)}
                    style={{
                      height: '280px',
                      objectFit: 'cover',
                    }}
                  />
                  <ImageListItemBar
                    title={
                      <Typography
                        variant="subtitle2"
                        component="span"
                        style={{
                          color: 'black',
                          textDecoration: 'underline',
                          display: '-webkit-box',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          wordBreak: 'break-word',
                        }}
                      >
                        {image.name}
                      </Typography>
                    }
                    position="below"
                  />
                  </a>
                  <Button variant="contained" onClick={() => save(index, image)}>{image.btnLabel}</Button>
                
              </ImageListItem>
            )
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default ShowImages;
