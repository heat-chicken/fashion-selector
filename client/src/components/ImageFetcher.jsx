import React, { useState, useEffect } from 'react'; 



// ImageFetcher fetches images from the supabase db using the users email as the key to find the image. it is wrapped in the useEffect hook to ensure that the fetch is only called once when the component mounts.
const ImageFetcher = ({ email, updateUrls }) => {
    const [localImageUrls, setLocalImageUrls] = useState([]); // the image urls are stored in the localImageUrls state using the setLocalImageUrls function.
    const [imageUrls, setImageUrls] = React.useState([]); // 3) the image urls are then stored in the imageUrls state using the setImageUrls function.

    React.useEffect(() => {
        const fetchImages = async () => { // 1) Image fetcher fetches images from the supabase db using the users email as the key to find the image. it is wrapped in the useEffect hook to ensure that the fetch is only called once when the component mounts.
            try {
                const imageUrls = [
                    {
                      photo: carousel1,
                      description: 'Photo by minhphamdesign @Unsplash',
                      artist: 'https://unsplash.com/@minhphamdesign',
                    },
                      {
                      photo: carousel2,
                      description: 'Photo by minhphamdesign @Unsplash',
                      artist: 'https://unsplash.com/@minhphamdesign',
                      },
                      {
                      photo: carousel3,
                      description: 'Photo by minhphamdesign @Unsplash',
                      artist: 'https://unsplash.com/@minhphamdesign',
                      },
                      {
                      photo: carousel4,
                      description: 'Photo by minhphamdesign @Unsplash',
                      artist: 'https://unsplash.com/@minhphamdesign',
                      },
                      {
                      photo: carousel5,
                      description: 'Photo by minhphamdesign @Unsplash',
                      artist: 'https://unsplash.com/@minhphamdesign',
                      },
                  
                    // ... other imageUrls
                  ];

                  // testing to see if the imageUrls are being set to the localImageUrls state so that they can be used in the SecretCloset component.
                  setLocalImageUrls(imageUrls);
                  updateUrls(imageUrls);


                // const response = await fetch(`/api/fetchImage?email=${email}`);

                // if (!response.ok) {
                //     throw new Error('Network response was not ok in ImageFetcher.jsx');
                // }

                // const data = await response.json(); // 2) response is converted to json and stored in the data variable.

                // setImageUrls(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchImages();
    }
    
    , [email, updateUrls]); // 4) the useEffect hook is dependent on the email prop, so it will be called whenever the email prop changes or when the component mounts. updateUrls is also a dependency of the useEffect hook.

    return (
        <div>
            {imageUrls.map((imageUrl, index) => ( // 5) the image urls are mapped over and displayed in an img tag.
                <img key={index} src={imageUrl} alt={`image-${index}`} />
            ))}
        </div>
    );
}

    
export default ImageFetcher; // 6) the ImageFetcher component is exported as the default export.

// client/src/components/ImageFetcher.jsx
    
    