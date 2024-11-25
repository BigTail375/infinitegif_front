import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dbutton, Cbutton, Header, Inputfile, Inputimage, Resultimage, Ubutton} from "../components";

function RecrusiveGif() {
  const [image, setImage] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5001/recrusivegif`, formData, {
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
      {image && <Inputimage image={image} />}
      <Inputfile setVideo={setImage} />
      {image && <div><Button buttonText={"Convert to recrusive gif"} callBack={handleUpload} /></div>}
      {image && gifUrl && 
        <div style={{margin: '20px'}}><Resultimage gif={gifUrl} /></div>
      }
      {image && gifUrl &&
        <div style={{display: 'flex'}}>
          <Ubutton gif={gifUrl} upload={upload} innerText={"Upload"}/>
        </div>
      }
    </div>
  );
}

export default RecrusiveGif;