// Search.jsx page is the main page that will render the input form 

import React, { useState } from 'react'; // to use hooks
import ImputForm from './InputForm'; // import InputForm component

const Search = () => {
    return (
        <div>
            <h1>Search Page</h1>
            <ImputForm />
        </div>
    );
}

export default Search; // export Search component to be used in App.jsx