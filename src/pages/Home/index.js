import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import NewsCard from "../../component/NewsCard";

const Home = () => {
  const [search, setSearch] = useState("india"); // Default search
  const [newsData, setNewsData] = useState(null);
  const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

  const getData = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
      const jsonData = await response.json();
      console.log(jsonData.articles);
      const filteredData = jsonData.articles; 
      setNewsData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (search) {
      getData(); // Fetch data when `search` changes
    }
  }, [search]);

  const handleInput = (e) => {
    setSearch(e.target.value); // Update search term from input
  };

  return (
    <div>
      <Navbar handleInput={handleInput} getData={getData} setSearch={setSearch} />
      <NewsCard articles={newsData} />
    </div>
  );
};

export default Home;
