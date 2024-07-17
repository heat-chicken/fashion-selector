// ShowImages.jsx

import React from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';

function ShowImages({ bingData }) {
  return (
    <div>
      <h2>Search Results</h2>
      <div
        className="bingImagesDisplay"
        style={{
          width: '950px',
          height: '660px', // fixed height for the scrollable div
          overflowY: 'auto', // enable vertical scrolling
          // border: '1px solid #ccc',
        }}
      >
        <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} gap={3}>
          {bingData.map((image) => (
            <ImageListItem
              key={image.contentUrl}
              sx={{ width: 300, heigth: 150 }}
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
            </ImageListItem>
          ))}
        </ImageList>
        {/* <ImageList variant="masonry" cols={3} gap={3}>
          {bingData.map((image, index) => (
            <ImageListItem key={image.contentUrl}>
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
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                  }}
                  className="bingImg"
                />
                <ImageListItemBar
                  position="below"
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
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        wordBreak: 'break-word',
                      }}
                    >
                      {image.name}
                    </Typography>
                  }
                />
              </a>
            </ImageListItem>
          ))}
        </ImageList> */}
      </div>
    </div>
  );
}

export default ShowImages;
