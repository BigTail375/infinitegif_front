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
        axios.post("http://127.0.0.1:5001/upload", formData)
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

  return ready ? (
    <div className="App">
      <Header />
      {video && <Inputvideo video={video} />}
      <Cbutton isConvert={false}/>
      <Inputfile setVideo={setVideo} />
      <Button convertToGif={convertToGif} />
      <h1>Result</h1>
      {gif && <Resultimage gif={gif} />}
      {gif && 
        <div style={{display: 'flex'}}>
          <Dbutton gif={gif} download={download} />
          <Ubutton gif={gif} upload={upload}/>
        </div>
      }
    </div>
  ) : (<p>Loading...</p>);
}

export default Gifconverter;