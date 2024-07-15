// ShowImages.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

function ShowImages({ bingData }) {
  // const location = useLocation();
  // const images = location.state?.images || [];

  return (
    <div>
      <h2>Search Results</h2>
      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}> */}
      <div className="bingImagesDisplay">
        {bingData.map((image, index) => (
          //   <div key={index} style={{ margin: '10px' }}>
          <div key={index}>
            <a
              href={image.hostPageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={image.contentUrl}
                alt="Similar product"
                className="bingImg"
                //   style={{ width: '200px', height: 'auto' }}
              />
              <br />
              <p>{image.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowImages;
