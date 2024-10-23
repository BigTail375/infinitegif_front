
import axios from "axios";
import { useState, useEffect } from "react";

import { Cbutton, MovieCard } from "../components";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMovie = async () => {
    const URL = `http://${process.env.REACT_APP_BACKEND_URL}:5001/page`;
    const page_data = await axios.post(URL, {"page":page})
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
  }, [loading]);

  return (
    <div className="App">
      <header className="App-header">
        <Cbutton isConvert={true}/>
        <div className="movieCardContainer">
          {data.length > 1 &&
            data.map((item) => {
              return (
                <MovieCard
                  key={item.path}
                  imageURL={item.path}
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