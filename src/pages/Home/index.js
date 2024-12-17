import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import NewsCard from "../../component/NewsCard";
import { fetchNewsAPIArticles, fetchGuardianArticles, fetchNYTimesArticles } from "../../services/api";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [selectedSource, setSelectedSource] = useState("All Data Source");
  const [isDateChanged, setIsDateChanged] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        let allArticles = [];

        // Call APIs based on the selected source
        if (selectedSource === "All Data Source" || selectedSource === "News API") {
          const newsAPIArticles = await fetchNewsAPIArticles(search, { date: localStorage.getItem("time"), category: "general" });
          allArticles = [...allArticles, ...newsAPIArticles];
        }

        if (selectedSource === "All Data Source" || selectedSource === "The Guardian") {
          const guardianArticles = await fetchGuardianArticles(search, { date: localStorage.getItem('time'), category: "general" });
          allArticles = [...allArticles, ...guardianArticles];
        }

        if (selectedSource === "All Data Source" || selectedSource === "New York Times") {
          const nytArticles = await fetchNYTimesArticles(search, { date: localStorage.getItem('time'), category: "general" });
          allArticles = [...allArticles, ...nytArticles];
        }

        setNewsData(allArticles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
    setIsDateChanged(false);
  }, [search, selectedSource, isDateChanged]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Navbar handleInput={handleInput} setSearch={setSearch} setSelectedSource={setSelectedSource} setIsDateChanged={setIsDateChanged} />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <NewsCard articles={newsData} />
      )}
    </div>
  );
};

export default Home;
