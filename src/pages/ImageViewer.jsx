import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SocialIcon } from 'react-social-icons'
import { Header } from "../components";

const ImageViewer = () => {
  const { image_id } = useParams(); // Extract the image_id from the URL
  const [imageUrl, setImageUrl] = useState("");
  const [imageTags, setImageTags] = useState([]);

  useEffect(() => {
    handleUrl();
  }, []);

  const handleUrl = async () => {
    const decodedImageId = decodeURIComponent(image_id);
    const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/id`;
    const id_data = await axios.post(URL, { id: decodedImageId });
    console.log("_________id_data:", id_data);

    setImageUrl(`http://${process.env.REACT_APP_BACKEND_URL}/img/${id_data.data.results.path}`);
    setImageTags(id_data.data.results.tags);
  };

  const copyToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      alert("Image URL is copied to clipboard!");
    }
  };


  return (
    <div className="App">
      <Header />
      <div className="App-header">
        {/* Left Panel: Image and Tags */}
        <div style={{ flex: 3 }}>
          <div style={{position: "relative"}}>
            <button
              onClick={copyToClipboard}
              className="share-button"
              style={{position: "absolute", top: "0px", "right": "4px"}}
            >
              Share
            </button>
            <img
              src={imageUrl}
              alt="Viewed Content"
              style={{ width: "100%", objectFit: "contain" }}
            />

          </div>
          
          <div className="tag-container" style={{ marginTop: "10px" }}>
            {imageTags.map((item, index) => (
              <div key={index} className="tag" style={{ display: "inline-block", margin: "5px", padding: "5px", border: "1px solid #ddd", borderRadius: "5px" }}>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageViewer;
