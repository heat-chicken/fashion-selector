// App.jsx
// Routes to render components

import React from 'react'; // import React from 'react to use JSX
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import react router 

import Search from './Search'; // import Search component
import ShowImages from './ShowImages'; // import ShowImages component
import Login from './Login'; // import Login component
import InputForm from './InputForm'; 

console.log('App.jsx is running');

function App() {
    return (
        <Router>
            <h1>App.jsx is running</h1>
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/images" element={<ShowImages />} />
            {/* <Route path="/store" element={<StoreListings />} /> */}
            <Route path="/login" element={<Login />} />
        </Routes>
        </Router>
    );
    }

export default App; // export App component to be used in index.js

