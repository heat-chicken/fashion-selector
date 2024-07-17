// Search.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate is a hook that returns a navigate function to navigate to a different route
import InputForm from './InputForm';
import ShowImages from './ShowImages';

import CircularProgress from '@mui/material/CircularProgress';

function Search() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [bingData, setBingData] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
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
        body: JSON.stringify({ item: currentPrompt.item, color: currentPrompt.color, style: currentPrompt.style }),
      });

      if (!response.ok) throw new Error('Network response was not ok on No button of Search.jsx');

      const data = await response.json();
      setLoading(false);
      handleImageGenerated(data.image_url, currentPrompt); // handleImageGenerated is a function that sets the currentImageUrl state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleYesClick = async () => {
    try {
      const response = await fetch('/api/bing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: currentImageUrl }),
      });

      if (!response.ok) throw new Error('Network response was not ok on Yes button of Search.jsxf');

      const data = await response.json();
      setBingData(data);
      console.log(data);

      // navigate('/images', { state: { images: data } });
    } catch (error) {
      console.error('Error in handleYesClick:', error);
    }
  };

  return (
    <div className="search-page pages">
      <div>
        <h1>Discover Your Style!</h1>
        {/* // InputForm component with onImageGenerated prop */}
        <InputForm onImageGenerated={handleImageGenerated}  setCurrentImageUrl = {setCurrentImageUrl}/>
        <br />
        {loading && <CircularProgress />}
        {currentImageUrl && (
          <div>
            <img
              src={currentImageUrl}
              alt="Generated"
              className="generatedImg"
            />
            <button onClick={handleNoClick}>No</button>
            <button onClick={handleYesClick}>Yes</button>
          </div>
        )}
      </div>
      {bingData ? (
        <ShowImages bingData={bingData} />
      ) : (
        <div style={{ width: '400px' }}></div>
      )}
      {/* {bingData && <ShowImages bingData={bingData} />} */}
    </div>
  );
}

export default Search;
