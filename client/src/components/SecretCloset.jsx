import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SecretCloset() {
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedImages();
  }, []);

  const fetchSavedImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/getsaveImg", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setSavedImages(data);
      } else if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching saved images:", error);
      setError("Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Favorites</h1>
      {savedImages.length > 0 ? (
        savedImages.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Saved ${index}`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
        ))
      ) : (
        <p>No images saved.</p>
      )}
    </div>
  );
}

export default SecretCloset;
