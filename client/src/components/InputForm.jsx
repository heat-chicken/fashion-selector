// InputForm.jsx

import React, { useState } from 'react';

function InputForm({ onImageGenerated }) { // onImageGenerated is a prop that is passed to the InputForm component
  const [inputValue, setInputValue] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/genImage', { // fetch request to the /api/genImage endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }), 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('data:', data);
      onImageGenerated(data.data[0].url); // onImageGenerated is a prop that is passed to the InputForm component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}> 
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter image description"
      />
      <button type="submit">Generate Image</button> 
    </form>
  );
}

export default InputForm;