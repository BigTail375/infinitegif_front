
import axios from "axios";
import { useState, useEffect } from "react";

import { Cbutton, AudioCard, Header } from "../components";

function AudioViewer() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMovie = async () => {
    const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/audio`;
    const page_data = await axios.post(URL, {"page":page})
    console.log(page_data.data.results);
    setData((prevData) => page_data.data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovie();
    console.log(window.location.hostname);
  }, [page]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener("scroll", debounce(handleScroll, 500));

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
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
  }, [loading]);

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="movieCardContainer">
          {data.length > 1 &&
            data.map((item) => {
              return (
                <AudioCard
                  key={item._id}
                  audioURL={item.audio}
                  _id={item._id}
                />
              );
            })}
          {loading && <h1>Loading....</h1>}
        </div>
      </header>
    </div>
  );
}

export default AudioViewer;