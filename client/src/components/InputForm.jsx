// Input.jsx
import { on } from 'form-data';
import React, { useState } from 'react';

function InputForm({ onImageGenerated }) { // InputForm component takes in onImageGenerated as a prop
  const [inputValue, setInputValue] = useState(''); // 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/genImage', {
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
      // onImageGenerated(data.imageUrl); // Pass img URL to parent component (Search.jsx) via onImageGenerated prop
      console.log('data:', data);
      onImageGenerated(data.data[0].url);
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

// // Input is a stateful component that will take in user input and send a post request to the server/route api/genImage ex: 'blue demin jacket' on the body of the request

// import React, { useState } from 'react'; // to use hooks

// function SimpleForm() {
//   const [inputValue, setInputValue] = useState(''); // Set initial state to empty string
//   const [response, setResponse] = useState(''); // Set initial state to empty string

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('Form submitted with value:', inputValue);
//     setResponse(''); // Clear previous response

//     try {
//       console.log('Form submitted with value:', inputValue);
//       const result = await fetch('/api/genImage', { // Send a POST to api/genImage
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // sending JSON
//         },
//         body: JSON.stringify({ prompt: inputValue }), // Sending input value as prompt
//       });

//       console.log('received response from server:', result);
      
//       if (!result.ok) {
//         setResponse('Network response was not ok');
//         return;
//       }

//       const data = await result.json(); // Parse the JSON
//       setResponse(data.message); // Assuming the server sends back a message
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setResponse('An error occurred while processing your request');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)} // Update input value
//           placeholder="Enter description (e.g., 'blue denim jacket')"
//         />
//         <button type="submit">Generate Image</button>
//       </form>
//       {response && <p>{response}</p>} // Display response (if any) 
//     </div>
//   );
// }

// // function SimpleForm() {
// //   const [inputValue, setInputValue] = useState('');

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     console.log('Form submitted with value:', inputValue);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         value={inputValue}
// //         onChange={(e) => setInputValue(e.target.value)}
// //       />
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // }

// export default SimpleForm; // export SimpleForm component to be used in Search.jsx