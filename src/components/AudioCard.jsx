import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const AudioCard = ({ audioURL, _id }) => {

  const audioPath = `http://${process.env.REACT_APP_BACKEND_URL}/img/${audioURL}`; // poster image path URL 
  const navigate = useNavigate();
  
  const downloadImage = async (audioURL) => {
    try {
      const link = document.createElement("a");
      link.href = audioURL;
      link.setAttribute("download", "audio.mp3");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the audio:', error);
    }
  };


  return (
    <div className="image-wrapper">
      <div className="audio-container">
        <audio controls src={audioPath} style={{width: '75%'}}>
          Your browser does not support the audio element.
        </audio>
      </div>
      <button className="download-btn" onClick={() => downloadImage(audioPath)}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  );
};

export default AudioCard;