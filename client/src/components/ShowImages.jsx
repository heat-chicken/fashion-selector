// ShowImages.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

function ShowImages() {
    const location = useLocation();
    const images = location.state?.images || [];

    return (
        <div>
            <h1>Show Images</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img 
                            src={image.contentUrl} 
                            alt="Similar product" 
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <br />
                        <a href={image.hostPageUrl} target="_blank" rel="noopener noreferrer">
                            View Product
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowImages;