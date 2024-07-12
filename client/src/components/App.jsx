// App.jsx
// Setup routes to render components

import React from 'react'; // import React from 'react to use JSX
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import react router 

import Search from './Search'; // import Search component
// import DisplayImage from './DisplayImage'; 
// import StoreListings from './StoreListings'; 
import InputForm from './InputForm'; 

console.log('App.jsx is running');

function App() {
    return (
        <Router>
            <h1>App.jsx is running</h1>
        <Routes>
            <Route path="/" element={<Search />} />
            {/* <Route path="/image" element={<DisplayImage />} /> */}
            {/* <Route path="/store" element={<StoreListings />} /> */}
        </Routes>
        </Router>
    );
    }

export default App; // export App component to be used in index.js



// import React from 'react';

// const App = () => {
//   console.log('App component is rendering');
//   return <h1>Hello from React!</h1>;
// };

// export default App;
