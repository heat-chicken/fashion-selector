// Search.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate is a hook that returns a navigate function to navigate to a different route
import InputForm from './InputForm'; 

function Search() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const navigate = useNavigate(); 

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
  };

  const handleNoClick = async () => {
    try {
      const response = await fetch('/api/genImage', { // fetch request to the /api/genImage endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: currentPrompt.item, color: currentPrompt.color, style: currentPrompt.style }),
      });

      if (!response.ok) throw new Error('Network response was not ok on No button of Search.jsx');

      const data = await response.json();
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
      navigate('/images', { state: { images: data } });
    } catch (error) {
      console.error('Error in handleYesClick:', error);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <InputForm onImageGenerated={handleImageGenerated} /> // InputForm component with onImageGenerated prop
      {currentImageUrl && (
        <div>
          <img src={currentImageUrl} alt="Generated" />
          <button onClick={handleNoClick}>No</button>  
          <button onClick={handleYesClick}>Yes</button>
        </div>
      )}
    </div>
  );
}

export default Search;