// InputForm.jsx

import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function InputForm({ onImageGenerated, setCurrentImageUrl }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ item: false, color: false, style: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      item: !item,
      color: !color,
      style: !style,
    };
    setErrors(newErrors);

    if (!item || !color || !style) {
      setLoading(false);
      return;
    }

    setCurrentImageUrl(null)
    setLoading(true);
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
        throw new Error(
          'Network response was not ok in InputForm.jsx handleSubmit'
        );
      }

      const data = await response.json();
      setLoading(false);
      console.log('data:', data);
      onImageGenerated(data.image_url, { item, color, style }); // item color and style are passed as an object to the onImageGenerated function so that it can be used in the Search component
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="item_text_box"
        // defaultValue="hi"
        label="Item" 
        value={item}
        onChange={(e) => setItem(e.target.value)}
        error={errors.item}
        helperText={errors.item ? 'Item is required' : ''}
      />
      <br />
      <br />
      <TextField
        id="color_text_box"
        // defaultValue="hi"
        label="color" 
        value={color}
        onChange={(e) => setColor(e.target.value)}
        error={errors.color}
        helperText={errors.color ? 'Color is required' : ''}
      />
      <br />
      <br />
      <TextField
        id="style_text_box"
        // defaultValue="hi"
        label="style" 
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        error={errors.style}
        helperText={errors.style ? 'Style is required' : ''}
      />
      <br />
      <br />
      <Button variant="contained" type="submit">Generate Image</Button>
      <br />
      <br />
      {loading && <CircularProgress />}
    </form>
    
  );
}

export default InputForm;
