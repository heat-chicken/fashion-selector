import React, { useState, useEffect } from 'react';

/// This comp is no longer in use. refer Secret Closet instead
const MyCloset = () => {

    const [savedImageUrls, setSavedImageUrls] = useState([]);

    const getImages = async () => {
        try {
          const response = await fetch('/api/getsaveImg');
        //   const data = await response.json();
        //   console.log('data is this',data.images)
        const data = await response.json();
        setSavedImageUrls(data);

        
        } catch (error) {
          console.error(error);
          return [];
        }
      };
      useEffect(() => {
    
        getImages();
      }, []);
      //getImages()
    // console.log('savedImages are' , savedImageUrls)
    //   const storedItems = await getImages();
    //   console.log('storedItems #1 is',storedItems[0])


    return (
        <div>
          <h1>My Favarites</h1>
          <div>
            {savedImageUrls.length > 0 ? (
              savedImageUrls.map((image, index) => (
                <img key={index} src={image.url} alt={`Saved ${index}`} style={{ width: '200px', height: 'auto', margin: '10px' }} />
              ))
            ) : (
              <p>No images saved.</p>
            )}
          </div>
        </div>
      );


}
export default MyCloset;