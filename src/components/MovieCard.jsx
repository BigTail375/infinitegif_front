import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ imageURL }) => {

  const imagePath = `http://${process.env.BACKEND_URL}/img/${imageURL}`; // poster image path URL 
  
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

  return (
    <div className="image-wrapper">
      <img src={imagePath}/>
      <button className="download-btn" onClick={() => downloadImage(imagePath)}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  );
};

export default MovieCard;