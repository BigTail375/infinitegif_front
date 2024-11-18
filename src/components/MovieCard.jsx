import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const MovieCard = ({ imageURL, _id }) => {

  const imagePath = `http://${process.env.REACT_APP_BACKEND_URL}/img/${imageURL}`; // poster image path URL 
  const navigate = useNavigate();
  
  const downloadImage = async (imageUrl) => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.setAttribute("download", "image.gif");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  const handleViewImage = () => {
    // Encode the imagePath to make it URL-safe
    const encodedImagePath = encodeURIComponent(_id);
    navigate(`/image/${encodedImagePath}`);
  };

  return (
    <div className="image-wrapper">
      <button className="image-container" onClick={handleViewImage} style={{ cursor: "pointer" }}>
        <img src={imagePath} alt="Movie" />
      </button>
      <button className="download-btn" onClick={() => downloadImage(imagePath)}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  );
};

export default MovieCard;