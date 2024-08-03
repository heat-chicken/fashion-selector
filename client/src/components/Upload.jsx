// Upload.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate is a hook that returns a navigate function to navigate to a different route
import ImageForm from './ImageForm';
import ShowImages from './ShowImages';
import KidPix from './KidPix';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { clearView, generate, bingSearch  } from '../slices/promptSlice'

function Upload() {
  const [errors, setErrors] = useState({
    itemDescription: false,
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [bingData, setBingData] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading_bing, setLoading_bing] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const [lines, setLines] = useState([]);
  const imgRef = useRef(null);
  const itemDescription = useSelector(store => store.prompt.itemDescription);
  const dispatch = useDispatch();

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
    updateImgUploadURL(imageUrl);
    dispatch(clearView())
    setLoading(false);
  };

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
    await dispatch(generate())

    setLoading(true);

    //console.log('ref', imgRef.current)

    
    try {
      const uploadImage = imgRef.current.toDataURL();
      
      console.log('uploadImage', uploadImage)
  
      const formData = new FormData();
      formData.append(
        'item',
        itemDescription
      );
      formData.append('uploadImage', uploadImage);
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
      handleImageGenerated(data.image_url, itemDescription); // item color and style are passed as an object to the onImageGenerated function so that it can be used in the Search component
    } catch (error) {
      console.error('Error:', error);
    }
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
    await dispatch(bingSearch());
    setBingData('');
    setLoading_bing(true);
    try {
      const uploadImage = imgRef.current.toDataURL();
      const formData = new FormData();
    formData.append('uploadImage', uploadImage);
      const response = await fetch('/api/bingUpload', {
        method: 'POST',
        body: formData,
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
    <>
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
          handleSubmit = {handleSubmit}
          errors = {errors}
          setErrors={setErrors}
        />
        <br />
        {loading && <CircularProgress />}
   
      </div>

      <KidPix
        imgRef={imgRef}
        currentImageUrl = {currentImageUrl}
        imgUploadURL = {imgUploadURL}
        updateImgUploadURL = {updateImgUploadURL}
        lines = {lines}
        setLines = {setLines}
        handleSubmit = {handleSubmit}
        handleYesClick = {handleYesClick}
      />
</div>

      {bingData ? (
        <ShowImages bingData={bingData} />
      ) : (
        <div>
          {/* <img src={image} style={{ width: '100%', marginLeft: '1rem' }} /> */}
        </div>
      )}
      {loading_bing && <LinearProgress />}

    </>
  );
}

export default Upload;
