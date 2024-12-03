import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dbutton, Cbutton, Header, Inputfile, Inputimage, Resultimage, Ubutton} from "../components";
import { useParams } from "react-router-dom";

function RecrusiveGif() {
  const { recrusive_id } = useParams(); 
  const [image, setImage] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);
  const [pieceSize, setPieceSize] = useState(1);
  const [tileSize, setTileSize] = useState(1);
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    
    try {
      console.log("recrusive_id", recrusive_id)
      var url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/recrusivegif`;
      if (recrusive_id == "2"){
        url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/paintbynumber`;
      }
      if (recrusive_id == "3"){
        url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/puzzle`;
        formData.append('pieceSize', pieceSize);
        console.log("formData", formData);
      }
      if (recrusive_id == "4"){
        url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/mosaic`;
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
      {image && <Inputimage image={image} />}
      <Inputfile setVideo={setImage} />
      {image && recrusive_id == "1" && <div><Button buttonText={"Convert to recrusive gif"} callBack={handleUpload} /></div>}
      {image && recrusive_id == "2" && <div><Button buttonText={"Paint By Number"} callBack={handleUpload} /></div>}
      {image && recrusive_id == "3" && <div style={{display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <p>Piece Size: </p>
        <input type="number" className="number-input" onChange={(e) => {setPieceSize(e.target.value);}} innerText="1"/>
        <Button buttonText={"Puzzle Effect"} callBack={handleUpload} />
      </div></div>}
      {image && recrusive_id == "4" && <div style={{display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <p>Tile Size: </p>
        <input type="number" className="number-input" onChange={(e) => {setTileSize(e.target.value);}} innerText="1"/>
        <Button buttonText={"Mosaic Effect"} callBack={handleUpload} />
      </div></div>}

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