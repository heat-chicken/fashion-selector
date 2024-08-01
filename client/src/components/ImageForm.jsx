// ImageForm.jsx

import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { describe, } from '../slices/promptSlice'

function ImageForm({ onImageGenerated, handleSubmit, imageUpload, errors, setErrors  }) {
  const itemDescription = useSelector(store => store.prompt.itemDescription);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  

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
        helperText={'Describe the clothes in detail: color, style, features, etc.'}
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
