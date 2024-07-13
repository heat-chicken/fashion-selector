// Search.jsx page is the main page that will render the input form 
import React, { useState } from 'react';
import InputForm from './InputForm';

function Search() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null); // image url state variable

  const handleImageGenerated = (imageUrl) => { // sets the current image url
    setCurrentImageUrl(imageUrl);
  };

  const handleNoClick = () => { // handles the no button click
    console.log('No clicked');
    // This will trigger a new image generation with the same prompt
    // You'll need to modify InputForm to expose this functionality
  };

  const handleYesClick = () => { // handles the yes button click
    console.log('Yes clicked');
    // This will send the current image URL to the Bing API
    // and navigate to the DisplayImages page
  };

  return (
    <div>
      <h1>Search Page</h1>
      <InputForm onImageGenerated={handleImageGenerated} /> // pass the handleImageGenerated function as a prop to the InputForm component
      {currentImageUrl && (
        <div>
          <img src={currentImageUrl} alt="Generated" /> // display the generated image
          <button onClick={handleNoClick}>No</button> // 
          <button onClick={handleYesClick}>Yes</button>
        </div>
      )}
    </div>
  );
}

export default Search;

// import React, { useState } from 'react'; // to use hooks
// import ImputForm from './InputForm'; // import InputForm component
// // import useLoaderData hook to get img url from the InputForm component
// import { useLoaderData } from '@remix-run/react'; 

// const Search = () => {
//     return (
//         <div>
//             <h1>Search Page</h1>
//             <ImputForm />
//         </div>
//     );
// }

// export default Search; // export Search component to be used in App.jsx