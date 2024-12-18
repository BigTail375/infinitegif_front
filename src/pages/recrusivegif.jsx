import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dbutton, Cbutton, Header, Inputfile, Inputimage, Resultimage, Ubutton} from "../components";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel({children, value, index, ...other}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function RecrusiveGif() {
  const [image, setImage] = useState(null);
  const [gifUrl, setGifUrl] = useState(null);
  const [effectType, setEffectType] = useState(0);
  const effectList = ["Recrusive", "PaintNumber", "Puzzle", "Mosaic", "Oil", "Cartoon", "Gray", "Sepia", "Negative", "Blur", "Sharpen", "Edge", "Emboss", "Bright", "Contrast", "Saturation", "Gaussian", "Median", "Bilateral", "Threshold", "Posterize", "Solarize", "Vignette", "Pixelate"]
  const nonParams = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 22];

  const handleEffectTypeChange = (event, newEffect) => {
    setEffectType(newEffect);
    setGifUrl(null);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    
    try {
      console.log("effect type", effectType);
      var url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/effect`;
      if (effectType < 4){
        if (effectType == 0)  {url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/recrusivegif`;}
        if (effectType == 1)  {url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/paintbynumber`;}
        if (effectType == 2)  {url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/puzzle`;}
        if (effectType == 3)  {url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/mosaic`;}
      }
      else{
        url = `http://${process.env.REACT_APP_BACKEND_URL}:5001/effect`;
        formData.append("effectType", effectType - 4);
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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={effectType}
            onChange={handleEffectTypeChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto">
            {effectList.map((key, index) => {
              return (<Tab key={key} label={effectList[index]} {...a11yProps(index)} />)
            })}
          </Tabs>
        </Box>
        {effectList.map((key, index) => {
          if (nonParams.includes(index)){
            return (<CustomTabPanel key={key} value={effectType} index={index}>
              {image && <Inputimage image={image} />}
              <Inputfile setVideo={setImage} />
              {image && <div style={{display: 'flex', justifyContent: 'center'}}><Button buttonText={"Apply Effect"} callBack={handleUpload}/></div>}
            </CustomTabPanel>)
          }
        })}
      </Box>

      {/* {image && recrusive_id == "1" && <div><Button buttonText={"Convert to recrusive gif"} callBack={handleUpload} /></div>}
      {image && recrusive_id == "2" && <div><Button buttonText={"Paint By Number"} callBack={handleUpload} /></div>}
      {image && recrusive_id == "3" && <div style={{display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <Button buttonText={"Puzzle Effect"} callBack={handleUpload} />
      </div></div>}
      {image && recrusive_id == "4" && <div style={{display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <Button buttonText={"Mosaic Effect"} callBack={handleUpload} />
      </div></div>} */}

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