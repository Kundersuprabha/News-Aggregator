import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import NewsCard from "../../component/NewsCard";
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNYTimesArticles } from "../../services/api";

const Home = () => {
  const [search, setSearch] = useState("india"); // Default search
  const [newsData, setNewsData] = useState(null);
  const [selectedSource, setSelectedSource] = useState("All Data Source"); // Manage the selected source

  const getData = async () => {
    try {
      let allArticles = [];

      // Call APIs based on the selected source
      if (selectedSource === "All Data Source" || selectedSource === "News API") {
        const newsAPIArticles = await fetchNewsAPIArticles(search, { date: "2024-01-01", category: "general" });
        allArticles = [...allArticles, ...newsAPIArticles];
      }

      if (selectedSource === "All Data Source" || selectedSource === "The Guardian") {
        const guardianArticles = await fetchGuardianArticles(search, { date: localStorage.getItem('time'), category: "general" });
        console.log(guardianArticles, 'Original Article:')

        allArticles = [...allArticles, ...guardianArticles];
      }

      if (selectedSource === "All Data Source" || selectedSource === "New York Times") {
        const nytArticles = await fetchNYTimesArticles(search, { date: localStorage.getItem('time'), category: "general" });
        allArticles = [...allArticles, ...nytArticles];
      }

      setNewsData(allArticles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data on search or selectedSource change
  }, [search, selectedSource]);

  const handleInput = (e) => {
    setSearch(e.target.value); // Update search term from input
  };

  return (
    <div>
      <Navbar handleInput={handleInput} setSearch={setSearch} setSelectedSource={setSelectedSource} />
      <NewsCard articles={newsData} />
    </div>
  );
};

export default Home;
