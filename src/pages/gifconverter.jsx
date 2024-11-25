import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dbutton, Cbutton, Header, Inputfile, Inputvideo, Resultimage, Ubutton} from "../components"

const ffmpeg = new FFmpeg();

function Gifconverter() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [gridUrl, setGridUrl] = useState();
  const [gridSize, setGridSize] = useState("4x4");
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const convertToGif = async () => {
    // Write the .mp4 to the FFmpeg file system 
    await ffmpeg.writeFile("video1.mp4", await fetchFile(video));
    
    // Run the FFmpeg command-line tool, converting 
    // the .mp4 into .gif file
    await ffmpeg.exec(["-i", "video1.mp4", "-t", "2.5", "-ss", "2.0", "-f", "gif", "out.gif"]);
    // Read the .gif file back from the FFmpeg file system
    const data = await ffmpeg.readFile("out.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
  };
  const gif2grid = (gif) => {
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
        formData.append("gridSize", gridSize); 

        axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5002/gif2grid`, formData)

        .then((response) => {
          console.log("Success:", response.data);
          
          const imgUrl = `http://${process.env.REACT_APP_BACKEND_URL}/temp/${response.data.results}`;  // Backend should return the image as binary
          console.log("Temp image: ", response.data.results);

          // Set the image URL to show in an img element
          document.getElementById('outputImage').src = imgUrl;
          setGridUrl(imgUrl);
          alert("Success: Image is uploaded and converted!")
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
        formData.append("tags", JSON.stringify([""]));

        axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5002/upload`, formData)
        
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

  const uploadGrid = () => {
    const urlArray = gridUrl.split('/');
    const formData = new FormData();
    console.log(urlArray[urlArray.length - 1])
    formData.append("file", urlArray[urlArray.length - 1]); 

    axios.post(`http://${process.env.REACT_APP_BACKEND_URL}:5002/uploadGrid`, formData) 
    .then((response) => {
      console.log("Success:", response.data);
      alert("Success: Image is uploaded!")
    })
  }

  const download = (e) => {
    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        console.log(buffer);
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.gif");
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setGridSize(selectedValue);
  }

  return ready ? (
    <div className="App">
      <Header />
      {video && <Inputvideo video={video} />}
      <Inputfile setVideo={setVideo} />
      <Button callBack={convertToGif} buttonText={"Convert"}/>
      {gif && <h1>Result</h1>}
      {gif && <Resultimage gif={gif} />}
      {gif && 
        <div style={{display: 'flex'}}>
          <Dbutton gif={gif} download={download} />
          <Ubutton gif={gif} upload={upload} innerText={"Upload"}/>
          <select id="grid-select" value={gridSize} onChange={handleChange} style={{margin: 'auto', padding: '5px 10px'}}>
            <option value="2x2">2x2</option>
            <option value="3x3">3x3</option>
            <option value="4x4">4x4</option>
          </select>
          <Ubutton gif={gif} upload={gif2grid} innerText={"Gif To Grid"}/>
        </div>
      }
      {gif && 
        <div style={{display: 'flex'}}>
        </div>
      }
      {gif &&
        <div style={{display: 'flex'}}>
          <img id="outputImage" style={{width: '80%', margin: 'auto'}}/>
          <Button buttonText={"Upload"} callBack={uploadGrid}/>
        </div>
      }
    </div>
  ) : (<p>Loading...</p>);
}

export default Gifconverter;