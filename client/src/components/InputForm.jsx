// InputForm.jsx

import React, { useState } from 'react';

function InputForm({ onImageGenerated }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/genImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item, color, style }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok in InputForm.jsx handleSubmit');
      }

      const data = await response.json();
      console.log('data:', data);
      onImageGenerated(data.image_url, { item, color, style }); // item color and style are passed as an object to the onImageGenerated function so that it can be used in the Search component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Item"
      />
      <br />
      <br />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color"
      />
      <br />
      <br />
      <input
        type="text"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        placeholder="Style"
      />
      <br />
      <br />
      <button type="submit">Generate Image</button>
    </form>
  );
}

export default InputForm;
