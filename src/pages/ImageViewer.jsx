import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SocialIcon } from 'react-social-icons'
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";

const ImageViewer = () => {
  const navigate = useNavigate();
  const { image_id } = useParams(); // Extract the image_id from the URL
  const decodedImageId = decodeURIComponent(image_id);
  const [imageUrl, setImageUrl] = useState("");
  const [imageTags, setImageTags] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [imageVote, setImageVote] = useState(0);
  const [currentVote, setCurrentVote] = useState(0);

  useEffect(() => {
    handleUrl();
  }, []);

  const handleUrl = async () => {
    const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/id`;
    const id_data = await axios.post(URL, { id: decodedImageId });
    console.log("_________id_data:", id_data);

    setImageUrl(`http://${process.env.REACT_APP_BACKEND_URL}/img/${id_data.data.results.path}`);
    if (id_data.data.results.audio != "") {
      setAudioUrl(`http://${process.env.REACT_APP_BACKEND_URL}/img/${id_data.data.results.audio}`)
    }
    else {
      setAudioUrl("");
    }
    setImageTags(id_data.data.results.tags);
    setImageVote(id_data.data.results.vote);
  };

  const copyImageToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      alert("Image URL is copied to clipboard!");
    }
  };
  const copyAudioToClipboard = () => {
    if (audioUrl) {
      navigator.clipboard.writeText(audioUrl);
      alert("Audio URL is copied to clipboard!");
    }
  };

  const handleTagImage = (tag_id) => {
    const encodedTagId = encodeURIComponent(tag_id);
    navigate(`/tag/${encodedTagId}`);
  }

  const handleUpVote = () => {
    if (currentVote != 1){
      setCurrentVote((prev) => {return prev + 1});
      const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/update_vote`;
      const id_data = axios.post(URL, { id: decodedImageId, vote: "up" });
    }
  }
  const handleDownVote = () => {
    if (currentVote != -1) {
      setCurrentVote((prev) => {return prev - 1})
      const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/update_vote`;
      const id_data = axios.post(URL, { id: decodedImageId, vote: "down" });
    }
  }
  return (
    <div className="App">
      <Header />
      <div className="App-header">
        {/* Left Panel: Image and Tags */}
        <div style={{ flex: 3 }}>
          <div className="tag-container" style={{ marginTop: "10px" }}>
            {imageTags.map((item, index) => (
              <button key={index} className="tag" onClick={() => {handleTagImage(item);}} style={{ display: "inline-block", margin: "5px", padding: "5px", border: "1px solid #ddd", borderRadius: "5px", cursor: "pointer"}}>
                {item}
              </button>
            ))}
          </div>
          
          <div style={{position: "relative"}}>
            <img
              src={imageUrl}
              alt="Viewed Content"
              style={{ width: "100%", objectFit: "contain" }}
            />
            {audioUrl != "" && <audio controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>}
            <div style={{display: 'flex', gap: '20px '}}>
              {imageUrl != "" && <button
                onClick={copyImageToClipboard}
                className="new-post-button"
              >
                Share Video
              </button>}
              {audioUrl != "" && <button
                onClick={copyAudioToClipboard}
                className="new-post-button"
              >
                Share Audio
              </button>}
              <button className="new-post-button" onClick={() => {handleUpVote();}}><BiUpvote /></button>
              <div>{imageVote + currentVote}</div>
              <button className="new-post-button" onClick={() => {handleDownVote();}}><BiDownvote /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
