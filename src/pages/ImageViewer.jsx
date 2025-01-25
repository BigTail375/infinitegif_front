import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SocialIcon } from 'react-social-icons'
import { Header, Ubutton } from "../components";
import { useNavigate } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

const ImageViewer = () => {
  const navigate = useNavigate();
  const { image_id } = useParams(); // Extract the image_id from the URL
  const decodedImageId = decodeURIComponent(image_id);
  const [imageUrl, setImageUrl] = useState("");
  const [imageTags, setImageTags] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [imageVote, setImageVote] = useState(0);
  const [currentVote, setCurrentVote] = useState(0);
  const [gridSize, setGridSize] = useState("4x4");
  const [gridUrl, setGridUrl] = useState();
  const [imageType, setImageType] = useState("gif");
  const [gifUrl, setGifUrl] = useState(null);
  const [tileSize, setTileSize] = useState(1);

  useEffect(() => {
    handleUrl();
    const domain = window.location.hostname;
    const appHeader = document.querySelector('.App-header');
    const domainColorMap = {
      "example1.com": "#ff23423",
      "example2.com": "#ff2234",
      "example3.com": "#eee241",
      "example4.com": "#f24412"
    }
    if (domainColorMap[domain]) {
      appHeader.style.backgroudColor = domainColorMap[domain];
    } else {
      appHeader.style.backgroundColor = '#282c34';
    }
  }, []);

  const handleUrl = async () => {
    const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/id`;
    const id_data = await axios.post(URL, { id: decodedImageId });
    console.log("_________id_data:", id_data);

    setImageUrl(`http://${process.env.REACT_APP_BACKEND_URL}/img/${id_data.data.results.path}`);
    if (id_data.data.results.path.endsWith("gif")){
      setImageType("gif");
    } else if (id_data.data.results.path.endsWith("png")){
      setImageType("png");
    }

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
  
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setGridSize(selectedValue);
  }
  
  const gif2grid = (gif) => {
    console.log(gif);
    const formData = new FormData();
    formData.append("_id", decodedImageId)
    formData.append("gridSize", gridSize); 

    axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5001/url2grid`, formData)

    .then((response) => {
      console.log("Success:", response.data);
      
      const imgUrl = `http://${process.env.REACT_APP_BACKEND_URL}/temp/${response.data.results}`;  // Backend should return the image as binary
      console.log("Temp image: ", response.data.results);

      setGridUrl(imgUrl);
      alert("Success: Image is uploaded and converted!")
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed: Image is not uploaded!")
    });
  }

  const uploadGrid = () => {
    const urlArray = gridUrl.split('/');
    const formData = new FormData();
    console.log(urlArray[urlArray.length - 1])
    formData.append("file", urlArray[urlArray.length - 1]); 

    axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5001/uploadGrid`, formData) 
    .then((response) => {
      console.log("Success:", response.data);
      alert("Success: Image is uploaded!")
    })
  }

  const handleUpload = async (uploadType) => {
    const formData = new FormData();
    formData.append("_id", decodedImageId);

    try {
      var url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/url2recrusive`;
      if (uploadType == 2){
        var url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/url2paint`;
      }
      if (uploadType == 3){
        var url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/url2puzzle`;
        formData.append('pieceSize', tileSize);
      }
      if (uploadType == 4){
        var url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/url2mosaic`;
        formData.append('tileSize', tileSize);
      }
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Expect a blob in response
      });

      // Create a URL for the returned image blob
      const imageBlob = new Blob([response.data]);
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setGifUrl(imageObjectUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  const upload = (gif) => {
    console.log(gif);
    fetch(gif, {
      method: "GET",
      headers: {},
    })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        console.log(buffer);
        const blob = new Blob([buffer], { type: "application/octet-stream" });

        // Create FormData and append the Blob
        const formData = new FormData();
        formData.append("file", blob, "filename.extension");

        axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5001/upload`, formData)
        
        .then((response) => {
          console.log("Success:", response.data);
          alert("Success: Image is uploaded!")
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed: Image is not uploaded!")
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="App">
      <Header />
      <div className="App-header">
        {/* Left Panel: Image and Tags */}
        <div>
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

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{display: 'flex', gap: '20px'}}>
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
          
          
          <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
              {imageType == "gif" && <div style={{display: 'flex', gap: '20px'}}>
                <select id="grid-select" value={gridSize} onChange={handleChange} className="new-post-button">
                  <option value="2x2">2x2</option>
                  <option value="3x3">3x3</option>
                  <option value="4x4">4x4</option>
                </select>
                <button onClick={() => {gif2grid();}} className="new-post-button">Gif to Grid</button>
              </div>}
              {imageType == "png" && <div style={{display: "flex", justifyContent: 'center', gap: '20px'}}>
                <div style={{display: 'flex', gap: '20px'}}>
                  <button className="new-post-button" onClick={() => {handleUpload(1);}}>recrusivegif</button>
                </div>
                <div style={{display: 'flex', gap: '20px'}}>
                  <button className="new-post-button" onClick={() => {handleUpload(2);}}>Paint Number</button>
                </div>
                <p>Size: </p>
                <input type="number" className="number-input" onChange={(e) => {setTileSize(e.target.value);}} innerText="1"/>
                <div style={{display: 'flex', gap: '20px'}}>
                  <button className="new-post-button" onClick={() => {handleUpload(3);}}>Puzzle</button>
                </div>
                <div style={{display: 'flex', gap: '20px'}}>
                  <button className="new-post-button" onClick={() => {handleUpload(4);}}>Mosaic</button>
                </div>
              </div>}
            </div>

          {gridUrl != null && <div style={{width: '100%', position: 'relative', marginTop: "40px"}}>
            <img 
              src={gridUrl}
              alt="Viewed Content"
              style={{ width: "100%", objectFit: "contain"}}
            />
            <button onClick={() => {uploadGrid();}} className="new-post-button" style={{position: 'absolute', top: '8px', right: '8px'}}>Upload</button>
          </div>}

          {gifUrl != null && <div style={{width: '100%', position: 'relative', marginTop: "40px"}}>
            <img 
              src={gifUrl}
              alt="Viewed Content"
              style={{ width: "100%", objectFit: "contain"}}
            />
            <button onClick={() => {upload(gifUrl);}} className="new-post-button" style={{position: 'absolute', top: '8px', right: '8px'}}>Upload</button>
          </div>}

        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
