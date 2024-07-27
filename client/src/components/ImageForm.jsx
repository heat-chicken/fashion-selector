// ImageForm.jsx

import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { describe } from '../slices/promptSlice'

function ImageForm({ onImageGenerated, setCurrentImageUrl, imageUpload, imgRef }) {
  const itemDescription = useSelector(store => store.prompt.itemDescription);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    itemDescription: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      itemDescription: !itemDescription,
    };
    setErrors(newErrors);

    if (!itemDescription) {
      setLoading(false);
      return;
    }

    setCurrentImageUrl(null);
    setLoading(true);
    event.preventDefault();

    //console.log('ref', imgRef.current)

    const uploadImage = imgRef.current.toDataURL();
    
    //console.log('uploadImage', uploadImage)

    const formData = new FormData();
    formData.append(
      'item',
      itemDescription
    );
    formData.append('uploadImage', uploadImage);

    try {
      const response = await fetch('/api/editImage', {
        method: 'POST',

        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          'Network response was not ok in ImageForm.jsx handleSubmit'
        );
      }

      const data = await response.json();
      setLoading(false);
      console.log('data:', data);
      onImageGenerated(data.image_url, itemDescription); // item color and style are passed as an object to the onImageGenerated function so that it can be used in the Search component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='item_description_text_box'
        // defaultValue="hi"
        label='Item description'
        value={itemDescription}
        onChange={(e) => dispatch(describe(e.target.value))}
        error={errors.itemDescription}
        helperText={errors.itemDescription ? 'Item description is required' : ''}
        multiline
        helperText={'Describe the clothes in detail.'}
        rows = {5}
      />
      <br />
      <br />
      <Button variant='contained' type='submit'>
        Generate Image
      </Button>
      {imageUpload != undefined && <p>Uploaded image ready.</p>}
      <br />
      <br />
      {loading && <CircularProgress />}
    </form>
  );
}

export default ImageForm;
