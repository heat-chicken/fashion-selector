import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import Nav from "./Nav";
import Search from "./Search";
import Login from "./Login";

// Import your background image
import backgroundImage from "../assets/images/background1.jpg";

// Create a styled component for the background
const BackgroundBox = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.5, // Adjust this value to change transparency (0 is fully transparent, 1 is fully opaque)
    zIndex: -1,
  },
}));

// Create a container for your content
const ContentContainer = styled(Box)({
  position: "relative",
  zIndex: 1,
});

console.log("App.jsx is running");

function App() {
  return (
    <BackgroundBox>
      <ContentContainer>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ContentContainer>
    </BackgroundBox>
  );
}

export default App;
