// Upload.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate is a hook that returns a navigate function to navigate to a different route
import ImageForm from './ImageForm';
import ShowImages from './ShowImages';
import KidPix from './KidPix';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

function Upload() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [bingData, setBingData] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading_bing, setLoading_bing] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const [lines, setLines] = useState([]);
  const imgRef = useRef(null);

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
    setLines([]);
    updateImgUploadURL(imageUrl);
    setLoading(false);
  };

  const handleNoClick = async () => {
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await fetch('/api/genImage', {
        // fetch request to the /api/genImage endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: currentPrompt.item,
          color: currentPrompt.color,
          style: currentPrompt.style,
          features: currentPrompt.features,
        }),
      });

      if (!response.ok)
        throw new Error(
          'Network response was not ok on No button of Search.jsx'
        );

      const data = await response.json();
      setLoading(false);
      handleImageGenerated(data.image_url, currentPrompt); // handleImageGenerated is a function that sets the currentImageUrl state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleYesClick = async () => {
    setBingData('');
    setLoading_bing(true);
    try {
      const response = await fetch('/api/bing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: currentImageUrl }),
      });

      if (!response.ok)
        throw new Error(
          'Network response was not ok on Yes button of Search.jsx'
        );

      const data = await response.json();
      setLoading_bing(false);
      setBingData(data);
      console.log(data);

      // navigate('/images', { state: { images: data } });
    } catch (error) {
      console.error('Error in handleYesClick:', error);
    }
  };

  const [imgUploadURL, updateImgUploadURL] = useState();

  return (
    <div
      className='search-page pages'
      style={{
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        margin: '50px 80px',
        justifyContent: 'space-around',
      }}
    >
      <div style={{ minWidth: '350px' }}>
        <h1>Discover Your Style</h1>
        {/* // InputForm component with onImageGenerated prop */}
        <ImageForm
          onImageGenerated={handleImageGenerated}
          setCurrentImageUrl={setCurrentImageUrl}
          imageUpload={imageUpload}
          imgRef={imgRef}
        />
        <br />
        {loading && <CircularProgress />}
        {currentImageUrl && (
          <div>
            <img
              src={currentImageUrl}
              alt='Generated'
              className='generatedImg'
              height='300px'
            />
            <br />
            <button onClick={handleNoClick}>No</button>
            <button onClick={handleYesClick}>Yes</button>
          </div>
        )}
      </div>

      <KidPix
        imgRef={imgRef}
        currentImageUrl = {currentImageUrl}
        imgUploadURL = {imgUploadURL}
        updateImgUploadURL = {updateImgUploadURL}
        lines = {lines}
        setLines = {setLines}
      />

      {bingData ? (
        <ShowImages bingData={bingData} />
      ) : (
        <div>
          {/* <img src={image} style={{ width: '100%', marginLeft: '1rem' }} /> */}
        </div>
      )}
      {loading_bing && <LinearProgress />}

      {/* {bingData && <ShowImages bingData={bingData} />} */}
    </div>
  );
}

export default Upload;
