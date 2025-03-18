
import axios from "axios";
import { useState, useEffect } from "react";

import { Cbutton, MovieCard, Header } from "../components";
import domainColorMap from "../style/backgroundColor.json";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMovie = async () => {
    const domain = window.location.hostname;
    const keys = Object.keys(domainColorMap);
    var index = keys.indexOf(domain);
    console.log("domain: ", index);
    if (index < 0)
      index = 0;
    const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/page`;
    const page_data = await axios.post(URL, {"page":page, "skip": 50 * index});
    console.log(page_data.data.results);
    setData((prevData) => page_data.data.results);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovie();

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
    if (domainColorMap[domain]) {
      appHeader.style.backgroundColor = domainColorMap[domain];
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
                <MovieCard
                  key={item._id}
                  imageURL={item.path}
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

export default Dashboard;