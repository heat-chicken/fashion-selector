// Input.jsx 
// Input is a stateful component that will take in user input and send a post request to the server/route api/genImage ex: 'blue demin jacket' on the body of the request

import React, { useState } from 'react'; // to use hooks

function SimpleForm() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with value:', inputValue);
    setResponse(''); // Clear previous response

    try {
      console.log('Form submitted with value:', inputValue);
      const result = await fetch('/api/genImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      console.log('received response from server:', result);
      
      if (!result.ok) {
        setResponse('Network response was not ok');
        return;
      }

      const data = await result.json();
      setResponse(data.message); // Assuming the server sends back a message
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponse('An error occurred while processing your request');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter description (e.g., 'blue denim jacket')"
        />
        <button type="submit">Generate Image</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

// function SimpleForm() {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Form submitted with value:', inputValue);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

export default SimpleForm; // export SimpleForm component to be used in Search.jsx