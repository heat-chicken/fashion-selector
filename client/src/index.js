// src.index.js front end entry point
// import react and react dom, renders the App component to the root element in the index.html file
// render root component to the DOM

import React from 'react'; // import React from 'react' to use JSX
import ReactDOM from 'react-dom'; // renders react components to the DOM
import App from './components/App.jsx'; // so that we can render the main App component to the DOM
import InputForm from './components/InputForm.jsx'; // import InputForm component to be used in App.jsx
import { createRoot } from 'react-dom/client'; // new component: createRoot lets you create a root to display React components inside a browser DOM node.

const root = createRoot(document.getElementById('root')); // create root to display components inside a browser DOM node
//<React.StrictMode> // do we neet this? 
  root.render(<App />);
//</React.StrictMode>

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './app';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// console.log('index.js file rendering#1');

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
