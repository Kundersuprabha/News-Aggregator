import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import FilterSidebar from "../../component/FilterSidebar";
import NewsCard from "../../component/NewsCard";
import data from '../../data.json'

const Personalized = () => {
  const [filters, setFilters] = useState({
    sources: [],
    authors: [],
    categories: [],
    selectedSources: [],
    selectedAuthors: [],
    selectedCategories: [],
  });

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [filterSet, setFilterSet] = useState(false);
  const [values, setValues] = useState({
    source: [],
    author: [],
    category: []
  });

  const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleFilterChange = (type, value) => {
    // Update the filter state based on the filter type (sources, authors, categories)
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));

    let filteredData = data.articles;

  // Apply filter for sources
  if (filters.selectedSources.length > 0) {
    filteredData = filteredData.filter((article) =>
      filters.selectedSources.includes(article.source?.name || "Unknown Source")
    );
  }

  // Apply filter for authors
  if (filters.selectedAuthors.length > 0) {
    filteredData = filteredData.filter((article) =>
      filters.selectedAuthors.includes(article.author || "Anonymous")
    );
  }

  // Apply filter for categories
  if (filters.selectedCategories.length > 0) {
    filteredData = filteredData.filter((article) =>
      filters.selectedCategories.includes(article.category || "General")
    );
  }

  // Update newsData with filtered data
  setNewsData(filteredData);
  setFilterSet(true); 
  };
  

  const fetchNews = async () => {
    const sources = [
      ...new Set(data.articles.map((article) => article.source?.name || "Unknown Source")),
    ].slice(0, 10);

    const authors = [
      ...new Set(data.articles.map((article) => article.author || "Anonymous")),
    ].slice(0, 10);

    const categories = ["General", "Technology", "Health", "Sports"];

    setValues({
      source: sources,
      author: authors,
      category: categories,
    });


     // Set flag to show filtered data
  };

  useEffect(() => {
    fetchNews();
  }, [filters.selectedSources, filters.selectedAuthors, filters.selectedCategories, newsData]);

  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column"  padding={2}>
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <FilterSidebar
          open={open}
          onClose={toggleDrawer(false)}
          filters={filters}
          setFilters={setFilters}
          values={values}
          handleFilterChange={handleFilterChange} // Pass handleFilterChange here
        />
        {loading ? (
          <CircularProgress />
        ) : filterSet ? (
          <NewsCard articles={newsData} />
        ) : (
          <Typography>No news available for selected filters.</Typography>
        )}
      </Box>
    </>
  );
};


export default Personalized;
