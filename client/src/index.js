import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log('index.js file rendering#1');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
